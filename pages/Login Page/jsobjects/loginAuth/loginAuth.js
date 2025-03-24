export default {
	// Constants for Supabase connection
	SUPABASE_URL: "https://iuwrvlyhtutiqmjqrjbd.supabase.co",
	SUPABASE_KEY: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml1d3J2bHlodHV0aXFtanFyamJkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDY4OTE3MTYsImV4cCI6MjAyMjQ2NzcxNn0.WewAHigezTOixZWquSgpuSG8pEj7MNLrsoP95m803Q4",

	// Specify the redirect endpoint (The landing page)
	REDIRECT_URL: "https://ctcnetapps.us/app/bead-comprehensive-app/home-admin-66b4db469579f24357381914?branch=Master_donotdelete&embed=true",
	LANDING_PAGE: "Home Admin",


	supabaseClient() {
		return supabase.createClient(this.SUPABASE_URL, this.SUPABASE_KEY);
	},


	// Construct and navigate to the Azure OAuth url for authentication
	async initiateAzureOAuth() {
		try {
			// Specify the scopes you want, like 'email' and 'profile'
			const scopes = "email profile openid";

			// Construct the OAuth URL including the scopes
			const oauth_url = `${this.SUPABASE_URL}/auth/v1/authorize?provider=azure&scopes=${encodeURIComponent(scopes)}&redirect_to=${encodeURIComponent(this.REDIRECT_URL)}`;

			// Redirect the user to Microsoft's login page
			// navigateTo(oauth_url, {}, "NEW_WINDOW");
			navigateTo(oauth_url, {}, "SAME_WINDOW");

			return { success: true, error: null };
		} catch (error) {
			console.error("Error initiating Azure OAuth:", error);
			showAlert("Failed to initiate Microsoft login", "error");
			return { success: false, error };
		};
	},


	// Sign-in using Supabase authentication
	async supabaseSignin(email_input, pw_input) {
		// TESTING
		// email_input = Signin_Email_Input.text;
		// pw_input = Signin_PW_Input.text;

		// Create a new Supabase client instance
		const supabase_client = this.supabaseClient();

		try {
			// Properly destructure the response from signInWithPassword
			const { data, error } = await supabase_client.auth.signInWithPassword({
				email: email_input,
				password: pw_input
			});

			if (error) {
				console.error("Sign-in Error:", error);
				if (String(error).includes("Invalid login credentials")) {
					showAlert("Incorrect password. Please try again.", "warning")
				}
				return { success: false, error: error.message };
			}

			// Get the user and session objects from reponse data
			const user = data.user;
			const session = data.session;

			// Store session data in Appsmith's storage for later use
			storeValue("user_access_token", session.access_token);
			storeValue("user_refresh_token", session.refresh_token);
			storeValue("user", user);

			console.log("Sign-in successful:", data);
			return { success: true, user, session };
		} catch (error) {
			console.error("Unexpected error during sign-in:", error);
			return { success: false, error };
		}
	},


	// Update the password for a given user
	async supabaseUpdatePW() {
		// Create a new Supabase client instance
		const supabase_client = this.supabaseClient();

		try {
			// Properly destructure the response from signInWithPassword
			const { data, error } = await supabase_client.auth.signInWithPassword({
				email: Update_PW_Email_Input.text,
				password: Update_PW_Current_Input.text
			});

			if (error) {
				console.error("Sign-in Error:", error);
				return { success: false, error: error.message };
			}
			console.log("Sign-in successful:", data);
		} catch (error) {
			console.error("Unexpected error during sign-in:", error);
			return { success: false, error };
		}

		try {
			const { data, error } = await supabase_client.auth.updateUser({
				email: Update_PW_Email_Input.text,
				password: Update_PW_New_Input_Confirm.text,
			})

			if (error) {
				console.error("Password Update Error:", error);
				return { success: false, error: error.message };
			};

			// Check if the response indicates a successful password update
			if (data.user.identities) {
				// Close the modal
				closeModal('Update_PW_Modal');

				// If the password update is successful, show a success toast
				showAlert("Password successfully updated. Please login again.", "success");
				console.log("Password update successful:", data);

				// Log the user out
				globalAuth.globalSignout();

				return { success: true, data };
			} else {
				// If the response does not match the expected structure, show a generic error message
				const err = `No identity returned for user ${data.user.email} after password update`;
				return { success: false, error: err };
			};
		} catch (error) {
			console.error("Unexpected error during sign-in:", error);
			return { success: false, error };
		}
	},


	// Sign-up a user account with Supabase project
	async supabaseSignup() {
		// Create a new Supabase client instance
		const supabase_client = this.supabaseClient();

		try {
			// Create new user in Supabase project with user inputs
			const { data, error } = await supabase_client.auth.signUp({
				email: Signup_Email_Input.text,
				password: Signup_PW_Input.text
			});

			if (error) {
				showAlert(`${error}`, "error");
				console.error("Sign-up Error:", error);
				return { success: false, error: error.message };
			};

			if (data.user.identities.length == 1) {
				// TODO: Email SMTP is not currently set up for sending emails to users
				// If the user is new, prompt to check email for verification link
				// showAlert(`Please check the email sent to ${data.user.email} to verify your account.`, "success");
				// console.log(`Please check the email sent to ${data.user.email} to verify your account.`);
				console.log("Sign-up successful:", data);

				// Log the user out
				globalAuth.globalSignout();

				return { success: true, data };
			} else {
				const err = `More than one identity for user ${data.user.email}`;
				return { success: false, error: err };
			};
		} catch (error) {
			console.error("Unexpected error during sign-in:", error);
			return { success: false, error };
		}
	},


	async signinWrapper(method) {
		try {
			// Store the method used for authentication
			storeValue("auth_method", method);

			if (appsmith.store.auth_method == "supabase") {
				// [Supabase Auth] Handle user sign-in, admin check, and redirects
				// Sign-in using Supabase authentication
				const { success, error }  = await this.supabaseSignin(Signin_Email_Input.text, Signin_PW_Input.text);

				if (!success || error) {
					console.error("Error signing in with Supabase authentication:", error);
					// showAlert("Error signing in with Supabase authentication:", "error");
					// showAlert(error, "error");
					return { success: false, error };
				};

				// Check if the user signing in is an admin
				globalAuth.checkAdmin();

				const user_name = appsmith.store.user.email.split("@")[0];
				showAlert(`Welcome ${user_name}!`, "success");

				// Navigate to landing page page
				navigateTo(this.LANDING_PAGE);

				return { success: true, error: null };
			} else if (appsmith.store.auth_method == "azure") {
				// [Microsoft Azure OAuth] Handle user OAuth redirect through Azure
				// Initiate the Microsoft Azure OAuth sign-in flow
				const { success, error } = await this.initiateAzureOAuth();

				if (!success || error) {
					console.error("Error initializing Azure OAuth sign-in:", error);
					// showAlert("Error initializing Azure OAuth sign-in:", "error");
					// showAlert(error, "error");
					return { success: false, error };
				};

				return { success: true, error: null };
			} else {
				const auth_method_err = `Unexpected authentication method: '${method}'`;
				console.error(auth_method_err);
				return { success: false, error: auth_method_err };
			};
		} catch (error) {
			console.error("Unexpected error during sign-in:", error);
			return { success: false, error };
		};
	},
}