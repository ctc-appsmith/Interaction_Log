export default {
	handleTabSelection: () => {
		const selectedTab = Main_Tabs.selectedTab;

		if (selectedTab === "Applications") {
			// Run specific function for Tab1
			return mainTabQueries.applicationTabQueries();
		} else if (selectedTab === "Tasks") {
			// Run specific function for Tab2
			return mainTabQueries.taskTabQueries();
		} else if (selectedTab === "Reports") {
			//Run specific function for Reports tab
			return mainTabQueries.reportTabQueries();
		}
		// Add additional conditions for other tabs as needed
	},
	applicationTabQueries: async () => {
		try {
			// Queries specific to Applications Tab
			await getApplications.run();     
			await getTeam.run();
			await getApplications_forUpdateForm.run();
			await getTasks_byApplication_3.run();

		} catch (error) {
			console.error("Error running app tab queries:", error);
		}
	},
	taskTabQueries: async () => {
		try {
			// Queries specific to Tasks Tab
			await Rept_COUNT_openTask_TeamAppTyp.run();     
			await Rept_COUNT_unassignedTasks.run();
			await getMyTasks.run();

		} catch (error) {
			console.error("Error running task tab queries:", error);
		}
	},

	// No queries need to run when Applicants tab selected. They are all run on page load. All other queries are called in the app.

	reportTabQueries: async () => {
		try {
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

			// Report Queries
			// run Rept_appsNoTasks
			await Rept_appsNoTasks.run();
			// Run Rept_allTasks
			await Rept_allTasks.run();
			// Run Rept_allApplications
			await Rept_allApplications.run();

		} catch (error) {
			console.error("Error running report tab queries:", error);
		}
	},

	// No queries need to run when Settings tab selected. They are all run on page load. All other queries are called in the app when an insert or update action is taken by the user.








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
			await getAppStatusTypes.run();

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

			// Run dash_appsbyTech
			await dash_appsbyTech.run();

			//Run dash_unassignedByTeam
			await dash_unassignedByTeam.run();

			// Run interactionLog_getEntityList
			await interactionLog_getEntityList.run();

			// Run getEntityType
			await getEntityType.run();

			// Run getApplicantStatus
			await getApplicantStatus.run();

			// Run getApplicantsOnly
			await getApplicantsOnly.run();
			// Run Rept_COUNT_pendingTasks
			await Rept_COUNT_pendingTasks.run();
			// Run getApplications_forUpdateForm
			await getApplications_forUpdateForm.run();

			// Run Rept_COUNT_taskStatus_Score
			await Rept_COUNT_taskStatus_Score.run();

			// Run Rept_COUNT_Applications
			await Rept_COUNT_Applications.run();

			// Run dash_TaskbyStatus
			await dash_incompleteTaskbyType.run();

			// Run Rept_getTaskStatusByTeam
			await Rept_getTaskStatusByTeam.run();
			// Run dash_appsbyStatus
			await dash_appsbyStatus.run();


		} catch (error) {
			console.error("Error running queries:", error);
		}
	}
}
