export default {
  // Function to run all the queries sequentially
  awardStatus: async () => {
    try {
      // Run insertAwardStatus_manOverride
      await insertAwardStatus_manOverride.run();
      
      // Run updateAwardStatus_manOverride
      await updateAwardStatus_manOverride.run();
      
      // Run getManualOverrideTable
      await getManualOverrideTable.run();
      
      // Run getApplications
      await getApplications.run();

    } catch (error) {
      console.error("Error running queries:", error);
    }
  }
}