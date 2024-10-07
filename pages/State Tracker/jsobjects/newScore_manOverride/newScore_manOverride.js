export default {
  // Function to run all the queries sequentially
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