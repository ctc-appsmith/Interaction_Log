export default {
	// Function to run all the queries sequentially
	// These queries either drive the first page the user sees (dashboard) or drive the dropdowns throughout the app.
	runQueries: async () => {
		try {
			//Dashboard Queries
			// Run Rept_COUNT_Applications
			//			await Rept_COUNT_Applications.run();
			// Run dash_appsbyStatus
			//			await dash_appsbyStatus.run();
			// Run dash_appsbyStatus_NV (stacked bar)
			//			await dash_appsbyStatus_NV.run();
			// Run dash_appsbyTech
			//			await dash_appsbyTech.run();
			// Run Rept_AppsByApplicant
			//			await Rept_AppsByApplicant.run();
			// Run dash_unassignedByTeam
			//			await dash_unassignedByTeam.run();
			// Run Rept_COUNT_pendingTasks
			//			await Rept_COUNT_pendingTasks.run();
			// Run Rept_getTaskStatusByTeam
			//			await Rept_getTaskStatusByTeam.run();
			// Run Rept_getTaskStatusByTeam_NV
			//			await Rept_getTaskStatusByTeam_NV.run();
			// Run Rept_appsNoTasks
			//			await Rept_appsNoTasks.run();
			// Run dash_incompleteTaskbyType
			//			await dash_incompleteTaskbyType.run();
			// Run Dash_getPendingTaskbyTeam
			//			await Dash_getPendingTaskbyTeam.run();
			// Run Rept_COUNT_openTask_TeamAppTyp
			//			await Rept_COUNT_openTask_TeamAppTyp.run();
			// Run dash_appsbyAward
			//			await dash_appsbyAward.run();


			// Drop Down Queries
			// Run getAppType
			await getAppType.run();
			// Run getTeam
			await getTeam.run();
			// Run getAppstatusType
			await getAppStatusTypes.run();
			// Run getEmployees
			await getEmployees.run();
			// Run getTaskStatusType
			await getTaskStatusType.run();
			// Run getTaskTypes_applicationtab
			await getTaskTypes_applicationtab.run();
			// Run getApplicantsOnly
			await getApplicantsOnly.run();
			// Run getEntityType
			await getEntityType.run();
			// Run getApplicantStatus
			await getApplicantStatus.run();
			// Run getTaskTypes_Settings
			await getTaskTypes_Settings.run();

		} catch (error) {
			console.error("Error running queries:", error);
		}
	}
}