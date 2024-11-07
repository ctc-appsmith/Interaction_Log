export default {
  detailTabQueries: async () => {
    try {
      // Queries specific to Details Tab
      await getApplications.run();     
      await getTeam.run();
   
    } catch (error) {
      console.error("Error running detail tab queries:", error);
    }
  },
  interactionTabQueries: async () => {
    try {
      // Queries specific to Interaction Log Tab
      await getCallLog2.run();     
   
    } catch (error) {
      console.error("Error running detail tab queries:", error);
    }
  },
  scoringAndBidTabQueries: async () => {
    try {
      // Queries specific to Scoring/Bid Selection Tab
      await getBidSelectionData_apptable.run();     
   		await getAppScores_overall.run();
			await getAppScores_ManualOverride.run();
			await getAppScores.run();
			await getManualScores.run();
			
    } catch (error) {
      console.error("Error running scoring/bid selection tab queries:", error);
    }
  },	
  scoringSubTabQueries: async () => {
    try {
      // Queries specific to Scoring/Bid Selection Tab
      await getBidSelectionData_apptable.run();     
   		await getAppScores_overall.run();
			await getAppScores_ManualOverride.run();
			await getAppScores.run();
			await getManualScores.run();
			
    } catch (error) {
      console.error("Error running Applications -> scoring tab queries:", error);
    }
  },	
  bidSelectionSubTabQueries: async () => {
    try {
      // Queries specific to Scoring/Bid Selection Tab
      await getBidSelectionData_apptable.run();     
			await getManualOverrideTable.run();
			
    } catch (error) {
      console.error("Error running Application -> bid selection tab queries:", error);
    }
  },	
  applicationTabQueries: async () => {
    try {
      // Queries specific to Applications subtab nested in applicants tab Tab
      await getApps_byApplicantTab.run();     
			await getApplications_forUpdate_II.run();
			
    } catch (error) {
      console.error("Error running applicant -> application sub tab queries:", error);
    }
  },	
	interactionLogTabQueries: async () => {
    try {
      // Queries specific to Interaction Log subtab nested in applicants tab Tab
      await getCallLog_applicantsTab.run();     
			
    } catch (error) {
      console.error("Error running applicant -> Interaction Log sub tab queries:", error);
    }
  },
 dashboardTabQueries: async () => {
    try {
      // Queries specific to Dashboard subtab nested in Reports Tab
		//Dashboard Queries
			// Run Rept_COUNT_Applications
			await Rept_COUNT_Applications.run();
			// Run dash_appsbyStatus
			await dash_appsbyStatus.run();
			// Run dash_appsbyTech
			await dash_appsbyTech.run();
			// Run Rept_AppsByApplicant
			await Rept_AppsByApplicant.run();
			// Run dash_unassignedByTeam
			await dash_unassignedByTeam.run();
			// Run Rept_COUNT_pendingTasks
			await Rept_COUNT_pendingTasks.run();
			// Run Rept_getTaskStatusByTeam
			await Rept_getTaskStatusByTeam.run();
			// Run Rept_appsNoTasks
			await Rept_appsNoTasks.run();
			// Run dash_incompleteTaskbyType
			await dash_incompleteTaskbyType.run();
			// Run Dash_getPendingTaskbyTeam
			await Dash_getPendingTaskbyTeam.run();
			// Run Rept_COUNT_openTask_TeamAppTyp
			await Rept_COUNT_openTask_TeamAppTyp.run();
			// Run dash_appsbyAward
			await dash_appsbyAward.run();
			
    } catch (error) {
      console.error("Error running Reports -> Dashboard sub tab queries:", error);
    }
  },
 reportSubTabQueries: async () => {
    try {
      // Queries specific to Reports subtab nested in Reports Tab
      await Rept_appsNoTasks.run();
			await Rept_allTasks.run();
			await Rept_allApplications.run();
			
    } catch (error) {
      console.error("Error running Reports -> Reports sub tab queries:", error);
    }
  },	
	
	
	
	
	
	
	
	
	
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
