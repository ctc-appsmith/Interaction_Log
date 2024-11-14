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

  parseVizUrl() {
    const url = new URL(this.credentials.vizUrl);
    const pathParts = url.pathname.split('/');
    return {
      workbook: pathParts[pathParts.length - 2],
      view: pathParts[pathParts.length - 1]
    };
  },

  async generateEmbedUrl() {
    try {
      const { workbook, view } = this.parseVizUrl();
      
      // For Direct Trust, we only need to include :embed=yes parameter
      const params = new URLSearchParams({
        ':embed': 'yes',
        ':showVizHome': 'no',
        ':toolbar': 'no',
        ':tabs': 'no'
      });

      // Construct URL without auth token
      const baseUrl = 'https://prod-useast-a.online.tableau.com';
      const path = `/t/${this.credentials.siteName}/views/${workbook}/${view}`;
      
      return `${baseUrl}${path}?${params.toString()}`;
    } catch (error) {
      console.error('Error generating embed URL:', error);
      throw error;
    }
  }
};