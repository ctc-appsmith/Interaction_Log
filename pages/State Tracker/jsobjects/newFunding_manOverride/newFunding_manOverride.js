export default {
  // Function to run all the queries sequentially
  updateTech: async () => {
    try {
      // Run insertFunding_manOverride
      await insertFunding_manOverride.run();
      
      // Run updateFundRequest_apptable to update the 'fundingRequest' field in the 'Applications' table.
      await updateFundRequest_apptable.isLoading.run();
      
      // Run getManualOverrideTable
      await getManualOverrideTable.run();
      
      // Run getBidSelectionData_apptable to 
      await getBidSelectionData_apptable.run();

    } catch (error) {
      console.error("Error running queries:", error);
    }
  }
}