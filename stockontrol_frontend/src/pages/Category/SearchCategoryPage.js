import React from "react";
import SearchHeader from "../../components/Headers/SearchHeader";
import labels from "../../config/labels";

const SearchCategoryPage = () => {
  return (
    <SearchHeader
      text={labels.CATEGORY.SEARCH_CATEGORY_PAGE}
      pathCreate={"/category/create"}
    />
  );
};

export default SearchCategoryPage;
