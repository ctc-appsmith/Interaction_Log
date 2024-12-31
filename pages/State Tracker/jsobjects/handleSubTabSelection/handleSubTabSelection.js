export default {
applicationTabSelection: () => {
    const selectedTab = Applications_Subtabs.selectedTab;

    if (selectedTab === "Application Information") {
      // Run specific function for Tab1
      return subTabQueries.appInfoTabQueries();
    } else if (selectedTab === "Tasks") {
      // Run specific function for Tab2
      return subTabQueries.taskTabQueries();
		} else if (selectedTab === "Scoring/Bid Selection") {
			//Run specific function for Reports tab
			return subTabQueries.scoringAndBidTabQueries();
		}
    // Add additional conditions for other tabs as needed
  },
scoringBidTabSelection: () => {
    const selectedTab = scoring_subtabs.selectedTab;

    if (selectedTab === "Scoring") {
      // Run specific function for Tab1
      return subTabQueries.scoringSubTabQueries();
    } else if (selectedTab === "Bid Selection Workspace") {
      // Run specific function for Tab2
      return subTabQueries.bidSelectionSubTabQueries();
		} 
    // Add additional conditions for other tabs as needed
  },
applicantTabSelection: () => {
    const selectedTab = Tabs1.selectedTab;

    if (selectedTab === "Applications") {
      // Run specific function for Tab1
      return subTabQueries.applicationTabQueries();
    } else if (selectedTab === "Interaction Log") {
      // Run specific function for Tab2
      return subTabQueries.interactionLogTabQueries();
		} 
    // Add additional conditions for other tabs as needed
  },
reportsTabSelection:  () => {
    const selectedTab = Report_Subtabs.selectedTab;

    if (selectedTab === "Dashboard") {
      // Run specific function for Tab1
      return subTabQueries.dashboardTabQueries();
    } else if (selectedTab === "Reports") {
      // Run specific function for Tab2
      return subTabQueries.reportSubTabQueries();
		} 
// No queries need to run when Settings tab selected. They are all run on page load. All other queries are called in the app when an insert or update action is taken by the user.
	
  }
}