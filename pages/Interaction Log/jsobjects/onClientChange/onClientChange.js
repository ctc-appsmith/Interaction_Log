export default {
  onChange: async () => {
    try {
      // Queries specific to Tasks Tab
      resetWidget(entitySelect)
			await getEntityList.run();     
      await getApplicantCallLog.run();
			await getApplicantsOnly.run();
			await getAppName2.run();
			await getAppName3.run();
			closeModal(To_AL_Log_Modal);
   
    } catch (error) {
      console.error("Error running queries:", error);
    }
  }
}