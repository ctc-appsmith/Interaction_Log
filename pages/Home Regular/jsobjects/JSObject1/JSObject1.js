export default {
  montanaURL: "https://ctcnetapps.us/app/grant-bid-tracker-mt/login-page-65bd14d46a813f5d1501a40d?branch=master",
  oregonURL: "https://ctcnetapps.us/app/oregon/main_page_url",

  redirectToApp(redirect_url) {
    const constructed_url = `${redirect_url}#access_token=${appsmith.store.access_token}&refresh_token=${appsmith.store.refresh_token}`;
    window.location.href = constructed_url;
  },

  async signin_func(redirect_url) {
    const api_call_name = "signin";

    await signin.run() // Calls the imported `signin` function
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
  },
};
