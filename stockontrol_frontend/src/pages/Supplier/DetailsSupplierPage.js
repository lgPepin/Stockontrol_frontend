import React from "react";
import DetailsHeader from "../../components/Headers/DetailsHeader";
import labels from "../../config/labels";
import SideBar from "../../components/SideBar/SideBar";

const DetailsSupplierPage = () => {
  return (
    <>
      <DetailsHeader
        text={labels.SUPPLIER.DETAILS_SUPPLIER_PAGE}
        pathSearch={"/supplier/search"}
        pathCreate={"/supplier/create"}
      />
      <SideBar />
    </>
  );
};

export default DetailsSupplierPage;
