import React from "react";
import CreateHeader from "../../components/Headers/CreateHeader";
import labels from "../../config/labels";

const CreateSupplierPage = () => {
  return (
    <CreateHeader
      text={labels.SUPPLIER.CREATE_SUPPLIER_PAGE}
      pathSearch={"/supplier/search"}
    />
  );
};

export default CreateSupplierPage;
