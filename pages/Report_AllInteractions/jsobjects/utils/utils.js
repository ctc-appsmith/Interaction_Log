export default {
isCurrentPage: (page) => {
	if(appsmith.store.page === page) return true;
	return false;
},
	
setCurrentPage: (page) => {
	storeValue('page' , page);
	navigateTo(page)
},
async checkSession() {
    // Check if user data exists
    if (get_user.data === null || get_user.data.code === 403) {
      // Sign out from Supabase
      await logout.logout();
      showAlert('Your session has expired. Please log in again.', 'warning');
      // If you have a login page, navigate to it
      navigateTo('Login Page', {}); // Replace 'Login' with your login page name
      return false;
    }
    return true;
  }		
}