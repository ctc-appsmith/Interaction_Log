export default {
  // Function to run all the queries sequentially
  newAward: async () => {
    try {
      // Run insertAwardStatus_manOverride
      await insertAwardStatus_manOverride.run();
      
      // Run updateAward_apptable to update the 'bidSelectionAwardStatus' field in the 'Applications' table.
      await updateAward_apptable.run();
      
      // Run getManualOverrideTable
      await getManualOverrideTable.run();
      
      // Run getBidSelectionData_apptable to populate the green boxes on the page.
      await getBidSelectionData_apptable.run();

    } catch (error) {
      console.error("Error running queries:", error);
    }
  },
	newTech: async () => {
		try {
			// Run insertTech_manOverride
			await insertTech_manOverride.run();

			// Run updateTechType_apptable to update the 'techType' field in the 'Applications' table.
			await updateTechType_apptable.run();

			// Run getManualOverrideTable
			await getManualOverrideTable.run();

			// Run getBidSelectionData_apptable to update the green 
			await getBidSelectionData_apptable.run();

		} catch (error) {
			console.error("Error running queries:", error);
		}
	},
	newFunding: async () => {
    try {
      // Run insertFunding_manOverride
      await insertFunding_manOverride.run();
      
      // Run updateFundRequest_apptable to update the 'fundingRequest' field in the 'Applications' table.
      await updateFundRequest_apptable.run();
      
      // Run getManualOverrideTable
      await getManualOverrideTable.run();
      
      // Run getBidSelectionData_apptable to 
      await getBidSelectionData_apptable.run();

    } catch (error) {
      console.error("Error running queries:", error);
    }
  },
	newScore: async () => {
    try {
      // Run insertScore_manOverride
      await insertScore_manOverride.run();
      
      // Run updateCurrentScore_apptable to update the 'currentScore' field in the 'Applications' table.
      await updateCurrentScore_apptable.run();
      
      // Run getManualOverrideTable
      await getManualOverrideTable.run();
      
      // Run getBidSelectionData_apptable to populate the green boxes on the page.
      await getBidSelectionData_apptable.run();

    } catch (error) {
      console.error("Error running queries:", error);
    }
  }
}