export default {
  // Function to run all the queries sequentially
  runQueries: async () => {
    try {
      // Run getAppType
      await getAppType.run();
      
      // Run getApplications
      await getApplications.run();
      
      // Run getTeam
      await getTeam.run();
      
      // Run getAppstatusType
      await getApplicationStatusTypes.run();
      
      // Run getEmployees
      await getEmployees.run();
      
      // Run getTasks_byApplication_3
      await getTasks_byApplication_3.run();
      
      // Run getTaskStatusType
      await getTaskStatusType.run();
      
      // Run getTaskTypes_applicationtab
      await getTaskTypes_applicationtab.run();
      
      // Run getApplicantsOnly
      await getApplicantsOnly.run();
			
			// Run getAppScores_overall
			await getAppScores_overall.run();
			
			// Run getAppScores_ManualOverride
			await getAppScores_ManualOverride.run();
			
			// Run getAppScores
			await getAppScores.run();
			
			// Run getManualScores
			await getManualScores.run();

      
    } catch (error) {
      console.error("Error running queries:", error);
    }
  }
}