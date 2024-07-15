import React from "react";
import CreateHeader from "../../components/Headers/CreateHeader";
import labels from "../../config/labels";
import SideBar from "../../components/SideBar/SideBar";

const CreateSupplierPage = () => {
  return (
    <>
      <CreateHeader
        text={labels.SUPPLIER.CREATE_SUPPLIER_PAGE}
        pathSearch={"/supplier/search"}
      />
      <SideBar />
    </>
  );
};

export default CreateSupplierPage;
