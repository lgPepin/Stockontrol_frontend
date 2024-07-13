import React from "react";
import CreateHeader from "../../components/Headers/CreateHeader";
import labels from "../../config/labels";

const CreateProductPage = () => {
  return (
    <CreateHeader text={labels.PRODUCT.CREATE_PRODUCT_PAGE} pathSearch={"/"} />
  );
};

export default CreateProductPage;
