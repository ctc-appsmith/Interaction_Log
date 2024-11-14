export default {
  // Store Tableau credentials
  credentials: {
    secretId: "YOUR_SECRET_ID", // Connected App Secret ID
    clientId: "YOUR_CLIENT_ID", // Connected App Client ID
    secretValue: "YOUR_SECRET_VALUE", // Connected App Secret Value
    userEmail: "YOUR_USER_EMAIL", // Tableau user email
    siteName: "YOUR_SITE_NAME", // e.g., "ctcanalytics"
    vizUrl: "YOUR_VIZ_URL" // The full URL path to your visualization
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
  async generateTableauUrl() {
    try {
      const jwt = await this.generateJWT();
      const url = new URL(this.credentials.vizUrl);
      const pathParts = url.pathname.split('/');
      const viewName = pathParts[pathParts.length - 1];
      
      return `https://prod-useast-a.online.tableau.com/t/${this.credentials.siteName}/views/${viewName}?:embed=yes&:toolbar=no&:showShareOptions=false&:display_count=n&:showVizHome=no&:origin=viz_share_link&:iid=1&auth_token=${jwt}`;
    } catch (error) {
      console.error('URL Generation Error:', error);
      throw error;
    }
  }
};