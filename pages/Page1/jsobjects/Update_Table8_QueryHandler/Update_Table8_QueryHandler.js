export default {
  // Function to run all the queries sequentially
  runQueries: async () => {
    try {
      // Run Update_ManualOverrideTable_2
      await Update_ManualOverrideTable_2.run();
      
      // Run Update_awardStatus_apps_2
      await Update_awardStatus_apps_2.run();
      
      // Run Update_currentScore_apps
      await Update_currentScore_apps.run();
      
      // Run get_negotiationStatus
      await get_negotiationStatus.run();
      
      // Run Update_fundingRequest_apps_1
      await Update_fundingRequest_apps_1.run();
      
      // Run get_ApplicationFunding
      await get_ApplicationFunding.run();
      
      // Run Update_currentTechType_apps_1
      await Update_currentTechType_apps_1.run();
      
      // Run get_currentTechType
      await get_currentTechType.run();
      
      // Run Select_manualOverrideTable1
      await Select_manualOverrideTable1.run();
      
      // Run get_currentScore
      await get_currentScore.run();
      
      // Close the modal
      closeModal('Update_ManualOverride_Modal');
      
    } catch (error) {
      console.error("Error running queries:", error);
    }
  }
}
