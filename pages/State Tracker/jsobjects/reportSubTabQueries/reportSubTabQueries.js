export default {
  // Function to run all the queries sequentially
  reportQueries: async () => {
    try {
      // Run Rept_COUNT_pendingTasks
      await Rept_COUNT_pendingTasks.run();
      
      // Run Rept_COUNT_taskStatus_Score
      await Rept_COUNT_taskStatus_Score.run();
      
      // Run Rept_COUNT_Applications
      await Rept_COUNT_Applications.run();
      
      // Run dash_appsbyAward
      await dash_appsbyAward.run();
      
      // Run Rept_getTaskStatusByTeam
      await Rept_getTaskStatusByTeam.run();
			
			// Run Rept_allTasks
			await Rept_allTasks.run();
			
			// Run Rept_allApplications
			await Rept_allApplications.run();

    } catch (error) {
      console.error("Error running queries:", error);
    }
  }
}
