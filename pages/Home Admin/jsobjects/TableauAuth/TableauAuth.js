export default {
    credentials: {
        kid: "8f0de1b5-d935-4841-a4e6-e1f7c6b1da99",    // Secret ID
        iss: "76ea0738-83d1-47dd-88ed-8eee8f79e6bf",       // Client ID
        sub: "dluongo@ctcnet.us",       // User email
        secretValue: "cGYOCH+a2SDtSRJd8ZUK5dJgjO8KsZNc7zSpGWvHWn0=" // Secret Value
    },

    generateJWT: async function() {
        try {
            const generateUUID = () => {
                return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (char) => {
                    const rand = Math.random() * 16 | 0;
                    const value = char === 'x' ? rand : (rand & 0x3 | 0x8);
                    return value.toString(16);
                });
            };
            
            const base64URLEncode = (str) => {
                return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
                    function toChar(match, p1) {
                        return String.fromCharCode('0x' + p1);
                    }))
                    .replace(/\+/g, '-')
                    .replace(/\//g, '_')
                    .replace(/=+$/, '');
            };

            const now = Math.floor(Date.now() / 1000);

            const header = {
                "kid": this.credentials.kid,
                "iss": this.credentials.iss,
                "sub": this.credentials.sub,
                "alg": "HS256",
                "typ": "JWT"
            };
            
            const payload = {
                "kid": this.credentials.kid,
                "iss": this.credentials.iss,
                "sub": this.credentials.sub,
                "aud": "tableau",
                "exp": now + 600,
                "nbf": now,
                "iat": now,
                "jti": generateUUID(),
                "scp": ["tableau:views:embed", "tableau:views:read"],
                "sub_type": "email"
            };

            const base64Header = base64URLEncode(JSON.stringify(header));
            const base64Payload = base64URLEncode(JSON.stringify(payload));
            const unsignedToken = `${base64Header}.${base64Payload}`;
            
            const keyData = await window.crypto.subtle.importKey(
                "raw", 
                new TextEncoder().encode(this.credentials.secretValue), 
                { name: "HMAC", hash: { name: "SHA-256" } }, 
                false, 
                ["sign"]
            );
            
            const signatureArrayBuffer = await window.crypto.subtle.sign(
                "HMAC", 
                keyData, 
                new TextEncoder().encode(unsignedToken)
            );
            
            const base64Signature = btoa(String.fromCharCode.apply(null, new Uint8Array(signatureArrayBuffer)))
                .replace(/\+/g, '-')
                .replace(/\//g, '_')
                .replace(/=+$/, '');
            
            const jwt = `${unsignedToken}.${base64Signature}`;
            return jwt;
        } catch (error) {
            console.error('JWT Generation Error:', error);
            throw error;
        }
    },

    embedTableau: async function() {
        try {
            const jwt = await this.generateJWT();
            
            // Create the embedding code
            return `
                <div id="tableauEmbed" style="width:100%; height:100%; margin:0; padding:0;">
                    <script type="module" src="https://embedding.tableauusercontent.com/tableau.embedding.3.1.0.min.js"></script>
                    <tableau-viz 
                        id="tableauViz"
                        src="https://prod-useast-a.online.tableau.com/t/ctcanalytics/views/ARPAProgressDashboard/ConnectMTARPABroadbandDevelopment_1"
                        token="${jwt}"
                        hide-tabs
                        toolbar="hidden"
                        style="width:100%; height:100%;">
                    </tableau-viz>
                </div>
            `;
        } catch (error) {
            console.error('Embedding Error:', error);
            throw error;
        }
    },

    testJWT: async function() {
        try {
            const jwt = await this.generateJWT();
            console.log('JWT Test:', {
                length: jwt.length,
                parts: jwt.split('.').length,
                hasValidStructure: jwt.split('.').length === 3,
                timestamp: new Date().toISOString()
            });
            return true;
        } catch (error) {
            console.error('JWT Test Failed:', error);
            return false;
        }
    }
};