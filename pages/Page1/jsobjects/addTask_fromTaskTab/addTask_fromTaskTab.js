export default {
  // Function to run all the queries sequentially
  addTask: async () => {
    try {
      // Run insertTask_fromTaskTab
			await insertTasks_fromTaskTab.run();
			
			// Run getMyTasks
      await getMyTasks.run();
      
      // Run Rept_COUNT_unassignedTasks
      await Rept_COUNT_unassignedTasks.run();
      
      // Run Rept_COUNT_openTask_TeamAppTyp
      await Rept_COUNT_openTask_TeamAppTyp.run();
			
			// Run Rept_COUNT_taskStatus_Score
			await Rept_COUNT_taskStatus_Score.run();
      
    } catch (error) {
      console.error("Error running queries:", error);
    }
  }
}