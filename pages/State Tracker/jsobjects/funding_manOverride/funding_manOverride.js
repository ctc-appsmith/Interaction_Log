export default {
  // Function to run all the queries sequentially
  updateTech: async () => {
    try {
      // Run insertFunding_manOverride
      await insertFunding_manOverride.run();
      
      // Run updateFunding_manOverride
      await updateFunding_manOverride.isLoading.run();
      
      // Run getManualOverrideTable
      await getManualOverrideTable.run();
      
      // Run getApplications
      await getApplications.run();

    } catch (error) {
      console.error("Error running queries:", error);
    }
  }
}