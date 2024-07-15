import React from "react";
import CreateHeader from "../../components/Headers/CreateHeader";
import labels from "../../config/labels";
import SideBar from "../../components/SideBar/SideBar";

const CreateUserPage = () => {
  return (
    <>
      <CreateHeader
        text={labels.USER.CREATE_USER_PAGE}
        pathSearch={"/user/search"}
      />
      <SideBar />
    </>
  );
};

export default CreateUserPage;
