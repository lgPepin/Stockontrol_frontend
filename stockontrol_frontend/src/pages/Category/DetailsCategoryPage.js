import React from "react";
import DetailsHeader from "../../components/Headers/DetailsHeader";
import labels from "../../config/labels";
import SideBar from "../../components/SideBar/SideBar";

const DetailsCategoryPage = () => {
  return (
    <>
      <DetailsHeader
        text={labels.CATEGORY.DETAILS_CATEGORY_PAGE}
        pathSearch={"/category/search"}
        pathCreate={"/category/create"}
      />
      <SideBar />
    </>
  );
};

export default DetailsCategoryPage;
