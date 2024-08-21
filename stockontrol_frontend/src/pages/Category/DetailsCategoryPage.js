import React from "react";
import DetailsHeader from "../../components/Headers/DetailsHeader";
import labels from "../../config/labels";
import SideBar from "../../components/SideBar/SideBar";
import Typography from "../../common/Typography/Typography";
import Input from "../../common/Input/Input";
import { useLocation, useNavigate } from "react-router-dom";

const DetailsCategoryPage = () => {
  const location = useLocation();
  const category = location.state?.category || {};
  const navigate = useNavigate();

  const goToUpdateCategoryPage = (category) => {
    navigate("/category/update", { state: { category } });
  };

  return (
    <>
      <DetailsHeader
        text={labels.PAGES.CATEGORY.DETAILS_CATEGORY_PAGE}
        pathSearch={"/category/search"}
        pathCreate={"/category/create"}
        onClick={() => goToUpdateCategoryPage(category)}
        backButtonName={labels.BUTTONS.BACK_BUTTON}
        editButtonName={labels.BUTTONS.EDIT_CATEGORY_BUTTON}
        createButtonName={labels.BUTTONS.CREATE_CATEGORY_BUTTON}
      />
      <div className="row align-items-start container_principal">
        <div className="col-2 sideBar_container">
          <SideBar />
        </div>
        <div className="offset-1 col-9 mt-5 frame">
          <div className="value_label_container mb-4">
            <Typography
              level="p"
              text="NOMBRE"
              className="label col-2 fw-bold"
            />

            <Input
              type="text"
              name="categoryName"
              value={category.category_name || ""}
              className="col-8 fs-2 ms-3 value"
              readOnly
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailsCategoryPage;
