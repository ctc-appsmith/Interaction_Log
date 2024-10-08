export default {
	async signin_func () {
		await signin.run()
		.then(data => {
			//delete data.user;
			Object.keys(data).forEach(i => {
				storeValue(i, data[i]);
			});
		})
		.then(() => navigateTo('Home'))
		.then(() => {{utils.setCurrentPage('Home')}})
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
				showAlert("Password sucessfully updated. Navigating \'Login Page\'", 'success')
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
	},
	
	montanaURL: "https://ctcnetapps.us/app/grant-bid-tracker-mt/login-page-65bd14d46a813f5d1501a40d?branch=master",

  redirectToApp(redirect_url) {
    const constructed_url = `${redirect_url}#access_token=${appsmith.store.access_token}&refresh_token=${appsmith.store.refresh_token}`;
    window.location.href = constructed_url;
		
  },

  async signin_func2(redirect_url) {
    const api_call_name = "signin";
		
    const signin = async () => {
      return await fetch('https://iuwrvlyhtutiqmjqrjbd.supabase.co/auth/v1/token?grant_type=password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: appsmith.store.user.email,
          password: appsmith.store.password,
        }),
      });
    };
		
    await this.signin_func() // Calls the imported `signin` function
      .then(data => {
        Object.keys(data).forEach(i => {
          storeValue(i, data[i]);
        });

        if (!appsmith.store.access_token) {
          console.error("No access token found in authentication response");
          showAlert("No access token found in authentication response", "error");
        } else {
          this.redirectToApp(redirect_url);
        }
      })
      .catch(err => {
        console.error("Error during signin:", err);
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