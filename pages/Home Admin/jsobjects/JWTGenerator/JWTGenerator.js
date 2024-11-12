export default {
    generateJWT: async () => {
        // Generate a UUID for jti
        const generateUUID = () => {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (char) => {
                const rand = Math.random() * 16 | 0;
                const value = char === 'x' ? rand : (rand & 0x3 | 0x8);
                return value.toString(16);
            });
        };

        // Encode a string in Base64 (without using unescape)
        const base64Encode = (str) => {
            return btoa(encodeURIComponent(str)
                .replace(/%([0-9A-F]{2})/g, (_, p1) => 
                    String.fromCharCode(parseInt(p1, 16))
                ));
        };

        // Define the JWT header
        const header = {
            "kid": "8f0de1b5-d935-4841-a4e6-e1f7c6b1da99", // Replace with your Secret ID
            "alg": "HS256",
            "typ": "JWT",
						"iss": "76ea0738-83d1-47dd-88ed-8eee8f79e6bf"
        };

        // Define the JWT payload claims
        const payload = {
            "iss": "76ea0738-83d1-47dd-88ed-8eee8f79e6bf",
						"sub": "dluongo@ctcnet.us", // Replace with the Tableau Cloud user email
            "aud": "tableau",
            "exp": Math.floor(Date.now() / 1000) + 600, // Expiration time (10 mins)
            "jti": generateUUID(), // Unique JWT ID
            "scp": ["tableau:views:embed"] // Scope for embedding
        };

        // Convert header and payload to Base64
        const base64Header = base64Encode(JSON.stringify(header));
        const base64Payload = base64Encode(JSON.stringify(payload));

        // Concatenate to form the unsigned JWT
        const unsignedToken = `${base64Header}.${base64Payload}`;

        // Convert secret value from base64 (just to match the expected format)
        const secretValue = "Xf2tz79UZ5Gb47LqDp7RLwmk7ZS4+Xww5ST94VeTMrI="; // Replace with your secret value
        const keyData = await window.crypto.subtle.importKey(
            "raw", 
            new TextEncoder().encode(secretValue), 
            { name: "HMAC", hash: { name: "SHA-256" } }, 
            false, 
            ["sign"]
        );

        // Sign the JWT using HMAC SHA-256 with the secret
        const signatureArrayBuffer = await window.crypto.subtle.sign(
            "HMAC", 
            keyData, 
            new TextEncoder().encode(unsignedToken)
        );

        // Convert signature from ArrayBuffer to Base64 (URL-safe)
        const base64Signature = btoa(String.fromCharCode.apply(null, new Uint8Array(signatureArrayBuffer)))
            .replace(/\+/g, '-')
            .replace(/\//g, '_')
            .replace(/=+$/, ''); // URL-safe Base64

        // Combine to form the final JWT
        const jwt = `${unsignedToken}.${base64Signature}`;
        return jwt;
    },

    authenticateTableau: async () => {
        try {
            // Await the JWT from generateJWT
            const jwtToken = await this.generateJWT();
            console.log("Generated JWT Token:", jwtToken); // Confirm the JWT is resolved correctly

            // Construct the URL with the resolved JWT token
           // const tableauURL = `https://prod-useast-a.online.tableau.com/t/ctcanalytics/views/ARPAProgressDashboard/ConnectMTARPABroadbandDevelopment_1
//?:embed=y&:showVizHome=no&:auth=${encodeURIComponent(jwtToken)}`;
            const tableauURL = `https://prod-useast-a.online.tableau.com/t/ctcanalytics/views/ARPAProgressDashboard/ConnectMTARPABroadbandDevelopment_1
?:embed=y&:showVizHome=no&:auth=${encodeURIComponent(await this.generateJWT())}`;            
            // Pass this URL to your Iframe widget in Appsmith
            console.log("Final Iframe URL: ", tableauURL);
            return tableauURL;
        } catch (error) {
            console.error("Error generating JWT or URL:", error);
            return null; // Handle errors if JWT generation fails
        }
    }
};