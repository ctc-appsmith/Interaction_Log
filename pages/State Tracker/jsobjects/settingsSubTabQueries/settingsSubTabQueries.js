export default {
  // Function to run all the queries sequentially
  runQueries: async () => {
    try {
      // Run getAppType
      await getAppType.run();
      
      // Run getTeam
      await getTeam.run();
      
      // Run getAppstatusType
      await getAppstatusType.run();
      
      // Run getEmployees
      await getEmployees.run();
      
      // Run getTaskStatusType
      await getTaskStatusType.run();
      
      // Run getTaskTypes_Settings
      await getTaskTypes_Settings.run();
      
      // Run getEntityType
      await getEntityType.run();
			
			// Run getApplicantStatus
			await getApplicantStatus.run();

    } catch (error) {
      console.error("Error running queries:", error);
    }
  }
}