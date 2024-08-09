export default {
	logout : () => {
		Object.keys(appsmith.store)
		.map(key => storeValue(key, undefined));
		navigateTo('Login Page')
	}
}