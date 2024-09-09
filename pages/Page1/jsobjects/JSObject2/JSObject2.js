export default {
{{
  const category = CategorySlider1.value;
  const columns = [
    {
      Header: "ID",
      accessor: "id",
      show: true
    },
    {
      Header: "Name",
      accessor: "name",
      show: category === "All" || category === "Basic Info"
    },
    {
      Header: "Category",
      accessor: "category",
      show: category === "All"
    },
    {
      Header: "Price",
      accessor: "price",
      show: category === "All" || category === "Stock Info"
    },
    {
      Header: "Stock",
      accessor: "stock",
      show: category === "All" || category === "Stock Info"
    }
  ];
  return columns;
}}
}