export default {
	// List the name strings of any modals on the current page
	PAGE_MODALS: ["Update_PW_Modal"],


	// Delete stored global variables
	deleteGlobals: async () => {
		clearStore();
		console.log("~~~ REMOVED ALL STORED VALUES ~~~")
  },


	// Print global variables to console
	printValues: async () => {
		console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
		// Iterate appsmith global variable store and print
		Object.keys(appsmith.store).forEach(function(key) {
				console.log(`${key}: `, appsmith.store[key]);
		});
		return appsmith.store;
  },


	// Temporarily toggle the softlock escape variable
	toggleSoftlockEscape() {
		storeValue("escape_softlock", true);
	},


	// Close modals on page load
	default_modal() {
		if (this.PAGE_MODALS.length > 0) {
			for (const modal_name of this.PAGE_MODALS) {
				closeModal(modal_name);
			};
		};
	},


	// Initializes the admin mode variable on page load
	default_admin_mode() {
		if (! appsmith.store.admin_mode) {
			storeValue("admin_mode", false);
		};
		if (! appsmith.store.admin_user_view) {
			storeValue("admin_user_view", false);
		};
	},


	// Get formatted timestamp
	getTimestamp() {
		// Get the timestamp in the desired format "YYYY-MM-DD HH:MM AM/PM"
		const f_timestamp = new Date().toLocaleString('en-US', {
			year: 'numeric',
			month: '2-digit',
			day: '2-digit',
			hour: '2-digit',
			minute: '2-digit',
			hour12: true
		});
		return f_timestamp
	}
}



// HTTP Response Status Codes Cheat Sheet
//
// 200 OK - The request succeeded. The result depends on the HTTP method:
//		•	GET - The resource has been fetched and transmitted in the message body.
//		•	HEAD - The representation headers are included in the response without any message body.
//		•	PUT or POST - The resource describing the result of the action is transmitted in the message body.
//		•	TRACE - The message body contains the request message as received by the server.
// 400 Bad Request - Status code returned when the form of the client request is not as the API expects.
// 401 Unauthorized - Status code returned when the client provides no credentials or invalid credentials.
// 403 Forbidden - Status code returned when a client has valid credentials but not enough privileges to perform an action on a resource.
// 404 Not Found - The server cannot find the requested resource. In the browser, this means the URL is not recognized. In an API, this can also mean that the endpoint is valid but the resource itself does not exist. May be sent instead of 403 Forbidden to hide the existence of a resource from an unauthorized client.
// 408 Request Timeout - This response is sent on an idle connection by some servers, even without any previous request by the client. It means that the server would like to shut down this unused connection.
// 422 Unprocessable Entity - The server can't process your request, although it understands it.
// 429 Too Many Requests - Indicates the user has sent too many requests in a given amount of time ("rate limiting").

