export default {
  // Function to run all the queries sequentially
  updateTech: async () => {
    try {
      // Run insertTech_manOverride
      await insertTech_manOverride.run();
      
      // Run updateTech_manOverride
      await updateTech_manOverride.isLoading.run();
      
      // Run getManualOverrideTable
      await getManualOverrideTable.run();
      
      // Run getApplications
      await getApplications.run();

    } catch (error) {
      console.error("Error running queries:", error);
    }
  }
}