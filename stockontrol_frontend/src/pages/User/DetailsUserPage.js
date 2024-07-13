import React from "react";
import DetailsHeader from "../../components/Headers/DetailsHeader";
import labels from "../../config/labels";

const DetailsUserPage = () => {
  return (
    <DetailsHeader
      text={labels.USER.DETAILS_USER_PAGE}
      pathSearch={"/user/search"}
      pathCreate={"/user/create"}
    />
  );
};

export default DetailsUserPage;
