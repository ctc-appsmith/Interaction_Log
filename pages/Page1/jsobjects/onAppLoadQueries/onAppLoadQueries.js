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

			// Run getApplications_forUpdateForm
			await getApplications_forUpdateForm.run();

		} catch (error) {
			console.error("Error running queries:", error);
		}
	}
}