import React from "react";
import DetailsHeader from "../../components/Headers/DetailsHeader";
import labels from "../../config/labels";
import SideBar from "../../components/SideBar/SideBar";

const DetailsUserPage = () => {
  return (
    <>
      <DetailsHeader
        text={labels.USER.DETAILS_USER_PAGE}
        pathSearch={"/user/search"}
        pathCreate={"/user/create"}
      />
      <SideBar />
    </>
  );
};

export default DetailsUserPage;
