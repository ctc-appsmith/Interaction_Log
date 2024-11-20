export default {
async handleClick() {
  // Run queries sequentially
 await getEntityList.run();
 await getApplicantCallLog.run().then(() => {
	 Input1.setValue("")
 });
	await getApplicantsOnly.run();
 //showAlert('app name 3', 'success');
}
}