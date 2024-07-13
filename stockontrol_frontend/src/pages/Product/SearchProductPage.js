import React from "react";
import SearchHeader from "../../components/Headers/SearchHeader";
import labels from "../../config/labels";

const SearchProductPage = () => {
  return (
    <SearchHeader
      text={labels.PRODUCT.SEARCH_PRODUCT_PAGE}
      pathCreate={"/product/create"}
    />
  );
};

export default SearchProductPage;
