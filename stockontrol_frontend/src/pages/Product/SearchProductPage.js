import React from "react";
import SearchHeader from "../../components/Headers/SearchHeader";
import labels from "../../config/labels";
import SideBar from "../../components/SideBar/SideBar";

const SearchProductPage = () => {
  return (
    <>
      <SearchHeader
        text={labels.PRODUCT.SEARCH_PRODUCT_PAGE}
        pathCreate={"/product/create"}
      />
      <SideBar />
    </>
  );
};

export default SearchProductPage;
