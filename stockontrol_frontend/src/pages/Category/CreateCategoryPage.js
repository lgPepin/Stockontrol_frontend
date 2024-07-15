import React from "react";
import CreateHeader from "../../components/Headers/CreateHeader";
import labels from "../../config/labels";
import SideBar from "../../components/SideBar/SideBar";

const CreateCategoryPage = () => {
  return (
    <>
      <CreateHeader
        text={labels.CATEGORY.CREATE_CATEGORY_PAGE}
        pathSearch={"/category/search"}
      />
      <SideBar />
    </>
  );
};

export default CreateCategoryPage;
