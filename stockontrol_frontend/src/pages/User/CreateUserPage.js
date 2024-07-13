import React from "react";
import CreateHeader from "../../components/Headers/CreateHeader";
import labels from "../../config/labels";

const CreateUserPage = () => {
  return (
    <CreateHeader
      text={labels.USER.CREATE_USER_PAGE}
      pathSearch={"/user/search"}
    />
  );
};

export default CreateUserPage;
