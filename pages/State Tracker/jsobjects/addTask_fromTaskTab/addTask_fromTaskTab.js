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
			
			// Run Rept_
			await rept_count_
      
    } catch (error) {
      console.error("Error running queries:", error);
    }
  }
}