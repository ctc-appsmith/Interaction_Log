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
      await getappstatustype.run();
      
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
      
      // Run getMyTasks
      await getMyTasks.run();
			
			// Run getApplications_byApplicant
			await getApplications_byApplicant.run();
			
			// Run Rept_COUNT_openTask_TeamAppTyp
			await Rept_COUNT_openTask_TeamAppTyp.run();
			
			// Run Rept_COUNT_unassignedTasks
			await Rept_COUNT_unassignedTasks.run();
			
			// Run interactionLog_getEntityList
			await interactionLog_getEntityList.run();
			
			// Run getEntityType
			await getEntityType.run();
			
			// Run getApplicantStatus
			await getApplicantStatus.run();
			
			// Run getApplicantsOnly
			await getApplicantsOnly.run();

      
    } catch (error) {
      console.error("Error running queries:", error);
    }
  }
}
