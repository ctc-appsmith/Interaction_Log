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
  }
}