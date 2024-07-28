import React from "react";
import DetailsHeader from "../../components/Headers/DetailsHeader";
import labels from "../../config/labels";
import SideBar from "../../components/SideBar/SideBar";
import Typography from "../../common/Typography/Typography";
import Input from "../../common/Input/Input";
import { useLocation, useNavigate } from "react-router-dom";

const DetailsUserPage = () => {
  const location = useLocation();
  const supplier = location.state?.supplier || {};
  const navigate = useNavigate();

  const goToUpdateSupplierPage = (supplier) => {
    navigate("/supplier/update", { state: { supplier } });
  };

  return (
    <>
      <DetailsHeader
        text={labels.USER.DETAILS_USER_PAGE}
        pathSearch={"/user/search"}
        pathCreate={"/user/create"}
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
          <div className="value_label_container mb-4">
            <Typography
              level="p"
              text="IDENTIFICACION"
              className="label col-2 fw-bold"
            />

            <Input
              type="text"
              name="identificationNumber"
              value={supplier.identification_number || ""}
              className="col-8 fs-2 ms-3 value"
              readOnly
            />
          </div>
          <div className="value_label_container mb-4">
            <Typography
              level="p"
              text="DIRECCION"
              className="label col-2 fw-bold"
            />

            <Input
              type="text"
              name="address"
              value={supplier.address || ""}
              className="col-8 fs-2 ms-3 value"
              readOnly
            />
          </div>
          <div className="value_label_container mb-4">
            <Typography
              level="p"
              text="TELEFONO"
              className="label col-2 fw-bold"
            />

            <Input
              type="text"
              name="phone"
              value={supplier.phone || ""}
              className="col-8 fs-2 ms-3 value"
              readOnly
            />
          </div>
          <div className="value_label_container mb-4">
            <Typography
              level="p"
              text="NOMBRE CONTACTO"
              className="label col-2 fw-bold"
            />

            <Input
              type="text"
              name="contactName"
              value={supplier.contact_name || ""}
              className="col-8 fs-2 ms-3 value"
              readOnly
            />
          </div>
          <div className="value_label_container mb-4">
            <Typography
              level="p"
              text="DIA DE PEDIDO"
              className="label col-2 fw-bold"
            />

            <Input
              type="text"
              name="orderDay"
              value={supplier.order_day || ""}
              className="col-8 fs-2 ms-3 value"
              readOnly
            />
          </div>
          <div className="value_label_container mb-4">
            <Typography
              level="p"
              text="DIA DE ENTREGA"
              className="label col-2 fw-bold"
            />

            <Input
              type="text"
              name="deliveryDay"
              value={supplier.delivery_day || ""}
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
              value={supplier.status || ""}
              className="col-8 fs-2 ms-3 value"
              readOnly
            />
          </div>
        </div>
      </div>
    </>
  );
};
export default DetailsUserPage;
