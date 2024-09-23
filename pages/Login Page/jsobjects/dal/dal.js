export default {
  async signin_func2 () {
    try {
      const { data, error } = await auth_bead_root // Use the name of your datasource
        .from('users')
        .select('username, password')
        .eq('username', signin_email_input.text); // assuming signin_email_input is your username field

      if (error) {
        throw new Error("User lookup failed");
      }

      if (data.length > 0) {
        const user = data[0];
        const isPasswordCorrect = await bcrypt.compare(signin_pw_input.text, user.password); // assuming signin_pw_input is your password field

        if (isPasswordCorrect) {
          // Successful login, proceed
          Object.keys(user).forEach(i => {
            storeValue(i, user[i]);
          });
          navigateTo('Home Admin');
        } else {
          showAlert("Invalid login credentials. Please try again.", 'error');
        }
      } else {
        showAlert("User not found. Please try again.", 'error');
      }
    } catch (err) {
      showAlert(`${err.message}. Please try again.`, 'error');
    }
  }
};
