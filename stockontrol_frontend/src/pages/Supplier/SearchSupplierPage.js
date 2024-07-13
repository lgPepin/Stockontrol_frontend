import React from "react";
import SearchHeader from "../../components/Headers/SearchHeader";
import labels from "../../config/labels";

const SearchSupplierPage = () => {
  return (
    <SearchHeader
      text={labels.SUPPLIER.SEARCH_SUPPLIER_PAGE}
      pathCreate={"/supplier/create"}
    />
  );
};

export default SearchSupplierPage;
