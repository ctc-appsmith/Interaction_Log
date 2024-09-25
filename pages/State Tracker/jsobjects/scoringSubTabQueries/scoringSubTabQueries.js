export default {
  // Function to run all the queries sequentially
  runQueries: async () => {
    try {
      
      // Run getApplications
      await getApplications.run();
			
			// Run getAppScores_overall
			await getAppScores_overall.run();
			
			// Run getAppScores_ManualOverride
			await getAppScores_ManualOverride.run();
			
			// Run getAppScores
			await getAppScores.run();
			
			// Run getManualScores
			await getManualScores.run();
			
			// Run getManualOverrideTable
			await getManualOverrideTable.run();
			
			// Run getAwardStatusTypes
			await getAwardStatusTypes.run();
      
    } catch (error) {
      console.error("Error running queries:", error);
    }
  }
}