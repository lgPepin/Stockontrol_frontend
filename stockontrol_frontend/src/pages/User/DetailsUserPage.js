import React from "react";
import DetailsHeader from "../../components/Headers/DetailsHeader";
import labels from "../../config/labels";
import SideBar from "../../components/SideBar/SideBar";
import Typography from "../../common/Typography/Typography";
import Input from "../../common/Input/Input";
import { useLocation, useNavigate } from "react-router-dom";

const DetailsSupplierPage = ({ onLogout }) => {
  const location = useLocation();
  const user = location.state?.user || {};
  const navigate = useNavigate();

  const goToUpdateUserPage = (user) => {
    navigate("/user/update", { state: { user } });
  };

  return (
    <>
      <DetailsHeader
        text={labels.PAGES.USER.DETAILS_USER_PAGE}
        pathSearch={"/user/search"}
        pathCreate={"/user/create"}
        onClick={() => goToUpdateUserPage(user)}
        backButtonName={labels.BUTTONS.BACK_BUTTON}
        editButtonName={labels.BUTTONS.EDIT_USER_BUTTON}
        createButtonName={labels.BUTTONS.CREATE_USER_BUTTON}
      />
      <div className="row align-items-start container_principal">
        <div className="col-2 sideBar_container">
          <SideBar onLogout={onLogout} />
        </div>
        <div className="offset-1 col-9 mt-5 frame">
          <div className="value_label_container mb-4">
            <Typography
              level="p"
              text="USUARIO"
              className="label col-2 fw-bold"
            />

            <Input
              type="text"
              name="userName"
              value={user.username || ""}
              className="col-8 fs-2 ms-3 value"
              readOnly
            />
          </div>
          <div className="value_label_container mb-4">
            <Typography
              level="p"
              text="APELLIDO"
              className="label col-2 fw-bold"
            />

            <Input
              type="text"
              name="userLastName"
              value={user.user_lastname || ""}
              className="col-8 fs-2 ms-3 value"
              readOnly
            />
          </div>
          <div className="value_label_container mb-4">
            <Typography
              level="p"
              text="NOMBRE"
              className="label col-2 fw-bold"
            />

            <Input
              type="text"
              name="userFirstName"
              value={user.user_firstname || ""}
              className="col-8 fs-2 ms-3 value"
              readOnly
            />
          </div>
          <div className="value_label_container mb-4">
            <Typography level="p" text="ROL" className="label col-2 fw-bold" />

            <Input
              type="text"
              name="role"
              value={user.role || ""}
              className="col-8 fs-2 ms-3 value"
              readOnly
            />
          </div>
          <div className="value_label_container mb-4">
            <Typography
              level="p"
              text="ESTADO"
              className="label col-2 fw-bold"
            />

            <Input
              type="text"
              name="status"
              value={user.status || ""}
              className="col-8 fs-2 ms-3 value"
              readOnly
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailsSupplierPage;
