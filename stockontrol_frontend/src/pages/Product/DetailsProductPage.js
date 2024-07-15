import React from "react";
import DetailsHeader from "../../components/Headers/DetailsHeader";
import labels from "../../config/labels";
import SideBar from "../../components/SideBar/SideBar";

const DetailsProductPage = () => {
  return (
    <>
      <DetailsHeader
        text={labels.PRODUCT.DETAILS_PRODUCT_PAGE}
        pathSearch={"/"}
        pathCreate={"/product/create"}
      />
      <SideBar />
    </>
  );
};

export default DetailsProductPage;
