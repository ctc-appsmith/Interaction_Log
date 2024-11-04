export default {
isCurrentPage: (page) => {
	if(appsmith.store.page === page) return true;
	return false;
},
	
setCurrentPage: (page) => {
	storeValue('page' , page);
	navigateTo(page)
},
	
generatePDF: async () => {
    // Select the main container of your dashboard
    const dashboardElement = document.getElementById("dashContainer");

    if (!dashboardElement) {
      showAlert("Dashboard container not found", "error");
      return;
    }

    // Use `jspdf-html2canvas` to generate PDF directly from HTML element
    const { jsPDF } = window.jspdf; // Access `jsPDF` from `jspdf-html2canvas`

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "pt",
      format: "a4"
    });

    pdf.html(dashboardElement, {
      callback: (pdf) => {
        pdf.save("dashboard.pdf");
      },
      x: 10,  // Adjust x and y as needed for positioning
      y: 10
    });
  }
}