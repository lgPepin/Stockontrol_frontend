import React from "react";
import CreateHeader from "../../components/Headers/CreateHeader";
import labels from "../../config/labels";
import SideBar from "../../components/SideBar/SideBar";

const CreateProductPage = () => {
  return (
    <>
      <CreateHeader
        text={labels.PRODUCT.CREATE_PRODUCT_PAGE}
        pathSearch={"/"}
      />
      <SideBar />
    </>
  );
};

export default CreateProductPage;
