export default {
	// Constants for Supabase connection
	SUPABASE_URL: "https://iuwrvlyhtutiqmjqrjbd.supabase.co",
	SUPABASE_KEY: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml1d3J2bHlodHV0aXFtanFyamJkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDY4OTE3MTYsImV4cCI6MjAyMjQ2NzcxNn0.WewAHigezTOixZWquSgpuSG8pEj7MNLrsoP95m803Q4",

	// Define list of admin user emails
	ADMINS: ["appsmith@ctcnet.us"],


	supabaseClient() {
		return supabase.createClient(this.SUPABASE_URL, this.SUPABASE_KEY);
	},


	// Basic sleep function
	sleep(ms) {
		return new Promise(resolve => setTimeout(resolve, ms));
	},


	// Check for administrator sign-in
	checkAdmin() {
		// Check if the user email is in the admins list
		if (this.ADMINS.includes(appsmith.store.user.email)) {
			// Welcome the administrator
			showAlert("✨ Welcome almighty administrator! ✨", "success");

			// Set admin mode state to true
			storeValue("admin_mode", true);

			// Set additional admin mode flags here
		};
	},


	// Handle force signout and redirect for any authentication failures
	async errorCatchSignout(specific_error) {
		try {
			await this.globalSignout(true);
			return { success: false, error: specific_error };
		} catch (signout_err) {
			console.error("Unexpected error during sign-out:", signout_err);
			clearStore();  // Clear all global variables on exit
			navigateTo("Login Page");  // Navigate to the login page
			return { success: false, error: signout_err };
		};
	},


	// Make an HTTP request to Supabase to validate the JWT access token for the stored user
	async getUserByAccessToken(access_token) {
		// Create a new Supabase client instance
		const supabase_client = this.supabaseClient();

		// Try to get user data with the token
		const { data, error } = await supabase_client.auth.getUser(access_token);

		if (error) {
			console.error("Error authenticating user with access token:", error);
			showAlert("Error authenticating user with access token:", "error");
			showAlert(error, "error");
			return this.errorCatchSignout(error.message);
		};
		return { success: true, user: data.user }
	},


	// Check for a valid, authenticated session for the current user
	async authenticateAccessToken() {
		try {
			// Initialize user data key variables
			const stored_user = appsmith.store.user;
			const stored_access_token = appsmith.store.user_access_token;

			// Check if we already have stored user data
			if (!stored_user || !stored_access_token) {
				console.log("User not authenticated in global storage");
				return { success: false, error: "User not authenticated in global storage" };
			};

			// Initialize user data other variables
			const stored_user_id = appsmith.store.user.id;
			const stored_auth_status = appsmith.store.user.aud;
			const stored_user_email = appsmith.store.user.email

			// Try to get user data with the token
			const attempt = await this.getUserByAccessToken(stored_access_token);

			if (!attempt.success || attempt.error) {
				return { success: false, error: attempt.error };
			};

			// If confirmed a valid user object, extract user data
			const user = attempt.user;

			// Check response user ID against stored user ID
			if (user.id != stored_user_id) {
				showAlert("User is not authenticated", "error");
				let user_mismatch_err = `Current user ID ${user.id} does not match stored user ID ${stored_user_id}`;
				console.error(user_mismatch_err);
				// Return fail status and proceed to logout
				return { success: false, error: user_mismatch_err };
			};

			// Check response user auth status against stored user auth status
			if (user.aud != stored_auth_status) {
				showAlert("User is not authenticated", "error");
				let user_mismatch_err = `Current user auth status ${user.aud} does not match stored user auth status ${stored_auth_status}`;
				console.error(user_mismatch_err);
				// Return fail status and proceed to logout
				return { success: false, error: user_mismatch_err };
			};

			// Check response user email against stored user email
			if (user.email != stored_user_email) {
				showAlert("User is not authenticated", "error");
				let user_mismatch_err = `Current user email ${user.email} does not match stored user email ${stored_user_email}`;
				console.error(user_mismatch_err);
				// Return fail status and proceed to logout
				return { success: false, error: user_mismatch_err };
			};

			console.log("Successfully authenticated access token for user:", user.email);
			// showAlert(`Successfully authenticated access token for user: ${user.email}`);

			console.log("Confirmed current user");
			return { success: true, user };
		} catch (err) {
			console.error("Unexpected error confirming user:", err);
			return { success: false, error: err };
		}
	},


	// Deconstruct a URL to get the parameters as a dictionary
	// Appsmith does not provide direct access to the standard `URLSearchParams` object
	// because it operates in a "controlled" environment where certain native browser APIs
	// are not directly accessible because /reasons/
	// Also, do not use the built in appsmith.URL.queryParams because it just doesn't work...
	parseRedirectURLParams(url_string) {
		try {
			const url_param_string = url_string.split("#")[1];
			const url_params = url_param_string.split("&");
			const params_dict = {};
			for (const param of url_params) {
				const param_key = param.split("=")[0];
				const param_val = param.split("=")[1];
				params_dict[param_key] = param_val;
			};
			return params_dict;
		} catch (error) {
			console.error("Error deconstructing URL parameters:", error);
			return error;
		};
	},


	// Retrieve and store user and session data after Azure authentication redirect
	async handleOAuthRedirect() {
		try {
			// Parse the landing URL after redirect to deconstruct the parameters
			const queryParams = this.parseRedirectURLParams(appsmith.URL.fullPath);
			const access_token = queryParams.access_token;
			const refresh_token = queryParams.refresh_token;
			// const expires_at = queryParams.expires_at;
			// const expires_in = queryParams.expires_in;
			// const provider_token = queryParams.provider_token;
			// const token_type = queryParams.token_type;
			console.info("queryParams:", queryParams);

			if (access_token && refresh_token) {
				console.log("Found access token in URL parameters");

				// Try to get user data with the token
				const attempt = await this.getUserByAccessToken(access_token);

				if (!attempt.success || attempt.error || !attempt.user) {
					return { success: false, error: attempt.error };
				};

				// Store user data
				storeValue("user_access_token", access_token);
				storeValue("user_refresh_token", refresh_token);
				storeValue("user", attempt.user);
			};

			// Check if the user signing in is an admin
			this.checkAdmin();

			const user_name = appsmith.store.user.email.split("@")[0];
			showAlert(`Successfully autheticated CTC Microsoft account`, "success");
			showAlert(`Welcome ${user_name}!`, "success");

			return { success: true, error: null };
		} catch (error) {
			console.error("Unexpected error handling OAuth redirect:", error);
			showAlert("An unexpected error occurred during Microsoft redirect", "error");
			return this.errorCatchSignout(error);
		};
	},


	// RUN ON PAGE LOAD
	// Function to handle redirection for unauthenticated or expired users
	async pageLoadAuthCheck() {
		// In case of sign-out redirect loop from some error in the code
		// Toggling `escape_softlock` will stall the pageLoadAuthCheck function for 60 seconds
		// This should be enough time to turn off the run on page load setting
		if (appsmith.store.escape_softlock) {
			console.log("Softlock condition identified. Stalling `pageLoadAuthCheck()`` for 60 seconds");
			await this.sleep(60000);  // Waits for 60 seconds
			storeValue("escape_softlock", false);
		};

		// Check the authentication method
		if (!appsmith.store.auth_method) {
			const auth_method_error = "No authentication method set";
			return this.errorCatchSignout(auth_method_error);
		} else if (appsmith.store.auth_method == "azure" && !appsmith.store.user_access_token) {
			// If the authentication method is Azure, store URL parameters for initial OAuth redirect
			const { success, error} = await this.handleOAuthRedirect();
			if (!success || error) {
				return { success: false, error };
			};
		};

		try {
			// Check the current user session is valid and authenticated
			const attempt = await this.authenticateAccessToken();

			if (!attempt.success || attempt.error) {
				return this.errorCatchSignout(attempt.error);
			};
			return { success: true, user: attempt.user };
		} catch (redirect_err) {
			console.error("Unexpected error confirming user authentication:", redirect_err);
			return this.errorCatchSignout(redirect_err);
		};
	},


	// Sign-out user regardless of authentication method
	async globalSignout(redirect) {
		showAlert("Logging out...", "info");

		// Create a new Supabase client instance
		const supabase_client = this.supabaseClient();

		try {
			const { error } = await supabase_client.auth.signOut();

			if (error) {
				console.error("Sign-out error:", error);
				return { success: false, error };
			}

			// Clear stored session data
			storeValue("user_access_token", null);
			storeValue("user_refresh_token", null);
			storeValue("user_auth_status", null);
			storeValue("user", null);
			clearStore();
			storeValue("admin_mode", false);

			// showAlert("User has been logged out.", "success");
			console.log("User signed out successfully");

			if (redirect) {
				// Redirect user to the login page
				navigateTo("Login Page");
			}

			return { success: true, error: null };
		} catch (err) {
			console.error("Unexpected error during sign-out:", err);
			return { success: false, error: err };
		}
	},
}