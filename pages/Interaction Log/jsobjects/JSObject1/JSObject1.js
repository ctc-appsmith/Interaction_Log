export default {
async handleClick() {
  // Run queries sequentially
 await getEntityList.run();
 await getApplicantCallLog.run().then(() => {
	 Input1.setValue("")
 });
 //showAlert('app name 3', 'success');
}
}