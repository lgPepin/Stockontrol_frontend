import React from "react";
import DetailsHeader from "../../components/Headers/DetailsHeader";
import labels from "../../config/labels";

const DetailsProductPage = () => {
  return (
    <DetailsHeader
      text={labels.PRODUCT.DETAILS_PRODUCT_PAGE}
      pathSearch={"/"}
      pathCreate={"/product/create"}
    />
  );
};

export default DetailsProductPage;
