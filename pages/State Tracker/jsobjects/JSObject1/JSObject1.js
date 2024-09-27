export default {
  // Function to run all the queries sequentially
  runQueries: async () => {
    try {
      // Run updateManOverrideTable
      await ;
      
      // Run updateAwardStatus_manOverride
      await updateAwardStatus_manOverride.run();

      // Run updateFunding_manOverride
      await updateFunding_manOverride.run();
      
      // Run updateTech_manOverride
      await updateTech_manOverride.run();
			
			// Run updateScore_manOverride
			await ; 
      
      // Run getManualOverrideTable
      await getManualOverrideTable.run();
        
      // Run getApplications
      await getApplications.run();
			
      // Close the modal
      closeModal('Update_ManualOverride_Modal');
      
    } catch (error) {
      console.error("Error running queries:", error);
    }
  }
}
