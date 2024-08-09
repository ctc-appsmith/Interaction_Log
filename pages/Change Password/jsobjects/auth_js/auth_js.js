export default {
	signin_func: () => {
		return signin.run()
		.then(data => {
			delete data.user;
			Object.keys(data).forEach(i => {
				storeValue(i, data[i]);
			});
		})
		.then(() => navigateTo('Clients'))
		.catch((err) => {
			//showAlert(`${err.message}`, 'error') //Error: signin failed to execute
			//showAlert(`Status Code: ${signin.responseMeta.statusCode}`, 'error') //400 BAD_REQUEST
			//showAlert(`Error Type: ${signin.data.error}`, 'error') //invalid_grant
			showAlert(`${signin.data.error_description}. Please try again.`, 'error') //Invalid login credentials
		});
	},
	signup_func: () => {
		return signup.run()
		.then(() => {
			if (signup.data.identities.length == 1) {
				showAlert("Please check your email for the verification link.", 'success')
			} else {
				// If signup API is called for an existing confirmed user,
				// an obfuscated/fake user object is returned with a null identity.
				showAlert(`Account already exists for ${signup.data.email}`, 'warning')
			};
		});
	},
	update_func: () => {
		return update.run()
		.then(() => {
			if (update.data.identities.length == 1) {
				showAlert("Password sucessfully updated. Navagating to \'Login Page\'", 'success')
				navigateTo('Login Page')
				logout.logout()
			} else {
				showAlert("Uhandled Error occured.", 'error')
			};
		});
	},

	continue: async () => {
		if(!appsmith.URL.fullPath.includes('#access_token=')) return;
		appsmith.URL.fullPath.split('#')[1].split('&').forEach(i => {
			const [key, value] = i.split('=');
			storeValue(key, value);
		});
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