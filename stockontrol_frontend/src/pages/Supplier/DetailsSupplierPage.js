import React from "react";
import DetailsHeader from "../../components/Headers/DetailsHeader";
import labels from "../../config/labels";
import SideBar from "../../components/SideBar/SideBar";
import Typography from "../../common/Typography/Typography";
import Input from "../../common/Input/Input";
import { useLocation, useNavigate } from "react-router-dom";

const DetailsSupplierPage = () => {
  const location = useLocation();
  const supplier = location.state?.supplier || {};
  const navigate = useNavigate();

  const goToUpdateSupplierPage = (supplier) => {
    navigate("/supplier/update", { state: { supplier } });
  };
  return (
    <>
      <DetailsHeader
        text={labels.SUPPLIER.DETAILS_SUPPLIER_PAGE}
        pathSearch={"/supplier/search"}
        pathCreate={"/supplier/create"}
        onClick={() => goToUpdateSupplierPage(supplier)}
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
              name="supplierName"
              value={supplier.supplier_name || ""}
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
