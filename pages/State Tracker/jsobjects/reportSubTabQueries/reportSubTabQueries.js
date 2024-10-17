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
      
      // Run dash_TaskbyStatus
      await dash_TaskbyStatus.run();
      
      // Run Rept_getTaskStatusByTeam
      await Rept_getTaskStatusByTeam.run();

    } catch (error) {
      console.error("Error running queries:", error);
    }
  }
}