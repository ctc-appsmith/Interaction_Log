export default {
  formatErrorMessage: (error) => {
    try {
      // Parse error if it's a string
      const errorObj = typeof error === 'string' ? JSON.parse(error) : error;
      
      // Extract common error properties
      const {
        message,
        status,
        statusText,
        code,
        name,
        stack,
        response,
        request,
        config
      } = errorObj;

      const formattedError = `
🚨 QUERY ERROR DETAILS 🚨

${message ? `Error Message: ${message}` : ''}
${status ? `Status: ${status} ${statusText || ''}` : ''}
${code ? `Error Code: ${code}` : ''}
${name ? `Error Type: ${name}` : ''}

${response?.data ? `Response Data: ${JSON.stringify(response.data, null, 2)}` : ''}
${config?.url ? `Endpoint: ${config.url}` : ''}
${config?.method ? `Method: ${config.method.toUpperCase()}` : ''}

${stack ? `Stack Trace:\n${stack}` : ''}

Timestamp: ${new Date().toLocaleString()}

If this error persists, please contact your administrator with these details.
`.trim();

      return formattedError;
    } catch (e) {
      // Fallback if parsing fails
      return `Detailed Error: ${JSON.stringify(error, null, 2)}`;
    }
  }
}