import React from "react";
import SearchHeader from "../../components/Headers/SearchHeader";
import labels from "../../config/labels";
import SideBar from "../../components/SideBar/SideBar";

const SearchCategoryPage = () => {
  return (
    <>
      <SearchHeader
        text={labels.CATEGORY.SEARCH_CATEGORY_PAGE}
        pathCreate={"/category/create"}
      />
      <SideBar />
    </>
  );
};

export default SearchCategoryPage;
