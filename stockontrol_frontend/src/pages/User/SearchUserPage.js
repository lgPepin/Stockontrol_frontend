import React from "react";
import SearchHeader from "../../components/Headers/SearchHeader";
import labels from "../../config/labels";
import SideBar from "../../components/SideBar/SideBar";

const SearchUserPage = () => {
  return (
    <>
      <SearchHeader
        text={labels.USER.SEARCH_USER_PAGE}
        pathCreate={"/user/create"}
      />
      <SideBar />
    </>
  );
};

export default SearchUserPage;
