export default {
isCurrentPage: (page) => {
	if(appsmith.store.page === page) return true;
	return false;
},
	
setCurrentPage: (page) => {
	storeValue('page' , page);
	navigateTo(page)
}	
}