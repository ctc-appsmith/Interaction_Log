export default {
	// Function to run all the queries sequentially
	updateRecords: async () => {
		try {
			// Run updateManualOverrideTable to update the record in the Manual Override Table
			await updateManualOverrideTable.run();

			// Run getManualOverrideTable to refresh the Manual Override Table
			await getManualOverrideTable.run();      

			// Run updateCurrentScore_apptable to update the 'currentScore' field in the 'Applications' table.
			await updateCurrentScore_apptable.run();

			// Run updateFundRequest_apptable to update the 'fundingRequest' field in the 'Applications' table.
			await updateFundRequest_apptable.run();

			// Run updateTechType_apptable to update the 'techType' field in the 'Applications' table.
			await updateTechType_apptable.run();			

			// Run updateAward_apptable to update the 'bidSelectionAwardStatus' field in the 'Applications' table.
			await updateAward_apptable.run();			

			// Run getBidSelectionData_apptable to populate the green boxes on the page.
			await getBidSelectionData_apptable.run();

		} catch (error) {
			console.error("Error running queries:", error);
		}
	}
}