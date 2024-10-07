export default {
  // Function to run all the queries sequentially
  newTech: async () => {
    try {
      // Run insertTech_manOverride
      await insertTech_manOverride.run();
      
      // Run updateTechType_apptable to update the 'techType' field in the 'Applications' table.
      await updateTechType_apptable.isLoading.run();
      
      // Run getManualOverrideTable
      await getManualOverrideTable.run();
      
      // Run getBidSelectionData_apptable to update the green 
      await getBidSelectionData_apptable.run();

    } catch (error) {
      console.error("Error running queries:", error);
    }
  }
}