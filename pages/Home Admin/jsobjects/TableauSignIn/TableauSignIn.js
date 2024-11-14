export default {
	async onPageLoad() {
		await storeValue('TableauAuth', TableauAuth);
return TableauAuth.generateEmbedUrl();
	}
}