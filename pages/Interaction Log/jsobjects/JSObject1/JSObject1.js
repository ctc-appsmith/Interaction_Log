export default {
async handleClick() {
  // Run queries sequentially
 await getEntityList.run();
 await getApplicantsOnly.run().then(() => {
	 Input1.setValue("")
 });
	await getappsbyapplicant_insert.run();
	await getApplicantCallLog.run();
 //showAlert('app name 3', 'success');
},
	
}