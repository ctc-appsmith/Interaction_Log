export default {
	redirect: async () => {
		try {
			await get_user.run();
			// do other things here
			//showAlert(`${}`, 'success')
		} catch (err) {
			if (get_user.data.code == 401) {
				showAlert(`User is not authenticated or session has expired.`, 'warning')
				showAlert(`Please login again.`, 'warning')
			} else {
				showAlert(`${err.message}!`, 'error')
				showAlert(`${get_user.responseMeta.statusCode}`, 'error')
				showAlert(`${get_user.data.msg}`, 'error')
			};
			navigateTo('Login Page');
		}
	}
}

//{
//  "error": "invalid_grant",
//  "error_description": "Invalid login credentials"
//}

// Error Logging function
//printErrorMessages: (errorCode) => {
//	if (errorCode == "403 Forbidden") {
//		return "Access Denied!";
//	} else if (errorCode == "503 Service Unavailable") {
//		return "The server is either not available or shut down.";
//	}
//}

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
//408 Request Timeout - This response is sent on an idle connection by some servers, even without any previous request by the client. It means that the server would like to shut down this unused connection.