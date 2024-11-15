export default {
  // Store Tableau credentials
  credentials: {
    secretId: "8f0de1b5-d935-4841-a4e6-e1f7c6b1da99", // Connected App Secret ID
    clientId: "76ea0738-83d1-47dd-88ed-8eee8f79e6bf", // Connected App Client ID
    secretValue: "cGYOCH+a2SDtSRJd8ZUK5dJgjO8KsZNc7zSpGWvHWn0=", // Connected App Secret Value
    userEmail: "dluongo@ctcnet.us", // Tableau user email
    siteName: "ctcanalytics", // e.g., "ctcanalytics"
    vizUrl: "https://prod-useast-a.online.tableau.com/t/ctcanalytics/views/ARPAProgressDashboard/ConnectMTARPABroadbandDevelopment_1" // The full URL path to your visualization
  },

  // Generate JWT token
 async generateJWT() {
    try {
      const generateUUID = () => {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
          const r = Math.random() * 16 | 0;
          const v = c === 'x' ? r : (r & 0x3 | 0x8);
          return v.toString(16);
        });
      };

      const now = Math.floor(Date.now() / 1000);
      const expiresIn = 600; // 10 minutes

      const header = {
        kid: this.credentials.secretId,
        iss: this.credentials.clientId,
        sub: this.credentials.userEmail,
        alg: 'HS256',
        typ: 'JWT'
      };

      const payload = {
        iss: this.credentials.clientId,
        sub: this.credentials.userEmail,
        aud: 'tableau',
        exp: now + expiresIn,
        nbf: now,
        jti: generateUUID(),
        scp: ['tableau:views:embed', 'tableau:views:read'],
        sub_type: 'email'
      };

      const base64URLEncode = (str) => {
        return btoa(str)
          .replace(/\+/g, '-')
          .replace(/\//g, '_')
          .replace(/=+$/, '');
      };

      const headerStr = base64URLEncode(JSON.stringify(header));
      const payloadStr = base64URLEncode(JSON.stringify(payload));
      const signatureInput = `${headerStr}.${payloadStr}`;
      
      const signatureBytes = await crypto.subtle.importKey(
        'raw',
        new TextEncoder().encode(this.credentials.secretValue),
        { name: 'HMAC', hash: 'SHA-256' },
        false,
        ['sign']
      );
      
      const signature = await crypto.subtle.sign(
        'HMAC',
        signatureBytes,
        new TextEncoder().encode(signatureInput)
      );

      const signatureStr = base64URLEncode(
        String.fromCharCode(...new Uint8Array(signature))
      );

      return `${headerStr}.${payloadStr}.${signatureStr}`;
    } catch (error) {
      console.error('JWT Generation Error:', error);
      throw error;
    }
  },

  parseVizUrl() {
    const url = new URL(this.credentials.vizUrl);
    const pathParts = url.pathname.split('/');
    return {
      workbook: pathParts[pathParts.length - 2],
      view: pathParts[pathParts.length - 1]
    };
  },

  async generateEmbedHtml() {
    try {
      const jwt = await this.generateJWT();
      const { workbook, view } = this.parseVizUrl();
      
      const html = `
        <!DOCTYPE html>
        <html>
          <head>
            <script type="module" src="https://public.tableau.com/javascripts/api/tableau.embedding.3.latest.js"></script>
          </head>
          <body style="margin:0; padding:0; overflow:hidden;">
            <tableau-viz 
              id="tableauViz" 
              src="https://prod-useast-a.online.tableau.com/t/${this.credentials.siteName}/views/${workbook}/${view}"
              hide-tabs
              toolbar="hidden"
              token="${jwt}"
              style="width:100vw; height:100vh;">
            </tableau-viz>
          </body>
        </html>
      `;
      
      // Create a blob URL for the HTML content
      const blob = new Blob([html], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      
      return url;
    } catch (error) {
      console.error('Error generating embed HTML:', error);
      throw error;
    }
  }

};