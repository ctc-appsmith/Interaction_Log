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

      // Base64URL encode without padding
      const base64URLEncode = (str) => {
        return btoa(str)
          .replace(/\+/g, '-')
          .replace(/\//g, '_')
          .replace(/=+$/, '');
      };

      // Create JWT parts
      const headerStr = base64URLEncode(JSON.stringify(header));
      const payloadStr = base64URLEncode(JSON.stringify(payload));

      // Create signature
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

      // Convert signature to Base64URL
      const signatureStr = base64URLEncode(
        String.fromCharCode(...new Uint8Array(signature))
      );

      return `${headerStr}.${payloadStr}.${signatureStr}`;
    } catch (error) {
      console.error('JWT Generation Error:', error);
      throw error;
    }
  },

  // Generate the URL for the dashboard
 async generateEmbedUrl() {
    try {
      const jwt = await this.generateJWT();
      
      // Parse the view name from vizUrl
      const urlParts = this.credentials.vizUrl.split('/');
      const workbook = urlParts[urlParts.length - 2];
      const view = urlParts[urlParts.length - 1];
      
      // Construct the direct embedding URL
      const baseUrl = 'https://prod-useast-a.online.tableau.com';
      const path = `/t/${this.credentials.siteName}/views/${workbook}/${view}`;
      
      const params = new URLSearchParams({
        ':embed': 'yes',
        ':showVizHome': 'no',
        ':toolbar': 'no',
        'auth_token': jwt
      });

      return `${baseUrl}${path}?${params.toString()}`;
    } catch (error) {
      console.error('URL Generation Error:', error);
      throw error;
    }
  },

  async testEmbed() {
    try {
      const jwt = await this.generateJWT();
      const url = await this.generateTableauUrl();
      console.log('JWT:', jwt);
      console.log('Generated URL:', url);
      return { success: true, url, jwt };
    } catch (error) {
      console.error('Test failed:', error);
      return { success: false, error: error.message };
    }
  }
};