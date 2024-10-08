import React from "react";
import DetailsHeader from "../../components/Headers/DetailsHeader";
import labels from "../../config/labels";
import SideBar from "../../components/SideBar/SideBar";
import Typography from "../../common/Typography/Typography";
import Input from "../../common/Input/Input";
import { useLocation, useNavigate } from "react-router-dom";

const NegativeListDetailsProductPage = ({ onLogout }) => {
  const location = useLocation();
  const product = location.state?.product || {};
  const navigate = useNavigate();

  const goToUpdateProductPage = (product) => {
    navigate("/product/update", { state: { product } });
  };

  return (
    <>
      <DetailsHeader
        text={labels.PAGES.PRODUCT.DETAILS_PRODUCT_PAGE}
        pathSearch={"/listNegativeStock/generate"}
        pathCreate={"/product/create"}
        onClick={() => goToUpdateProductPage(product)}
        backButtonName={labels.BUTTONS.BACK_BUTTON}
        editButtonName={labels.BUTTONS.EDIT_PRODUCT_BUTTON}
        createButtonName={labels.BUTTONS.CREATE_PRODUCT_BUTTON}
      />
      <div className="row align-items-start container_principal">
        <div className="col-2 sideBar_container">
          <SideBar onLogout={onLogout} />
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
              name="productName"
              value={product.product_name || ""}
              className="col-8 fs-2 ms-3 value"
              readOnly
            />
          </div>
          <div className="value_label_container mb-4 ">
            <Typography
              level="p"
              text="PROVEEDOR"
              className="label col-2 fw-bold"
            ></Typography>

            <Input
              type="text"
              name="supplier"
              value={product.supplier_name || ""}
              className="col-8 fs-2 ms-3 value"
              readOnly
            />
          </div>
          <div className="value_label_container mb-4">
            <Typography
              level="p"
              text="CATEGORIA"
              className="label col-2 fw-bold"
            ></Typography>

            <Input
              type="text"
              name="category"
              value={product.category_name || ""}
              className="col-8 fs-2 ms-3 value"
              readOnly
            />
          </div>
          <div className="value_label_container mb-4">
            <Typography
              level="p"
              text="STOCK"
              className="label col-2 fw-bold"
            ></Typography>

            <Input
              type="text"
              name="stock"
              value={product.stock || ""}
              className="col-8 fs-2 ms-3 value"
              readOnly
            />
          </div>
          <div className="value_label_container mb-4 ">
            <Typography
              level="p"
              text="PRECIO COMPRA"
              className="label col-2 fw-bold"
            ></Typography>

            <Input
              type="text"
              name="purchasePrice"
              value={product.purchase_price || ""}
              className="col-8 fs-2 ms-3 value"
              readOnly
            />
          </div>
          <div className="value_label_container mb-4 ">
            <Typography
              level="p"
              text="PRECIO VENTA"
              className="label col-2 fw-bold"
            ></Typography>

            <Input
              type="text"
              name="sellingPrice"
              value={product.selling_price || ""}
              className="col-8 fs-2 ms-3 value"
              readOnly
            />
          </div>
          <div className="value_label_container mb-4">
            <Typography
              level="p"
              text="ESTADO"
              className="label col-2 fw-bold"
            ></Typography>

            <Input
              type="text"
              name="status"
              value={product.status || ""}
              className="col-8 fs-2 ms-3 value"
              readOnly
            />
          </div>
          <div className="value_label_container">
            <Typography
              level="p"
              text="FECHA INVENTARIO"
              className="label col-2 fw-bold"
            ></Typography>

            <Input
              type="text"
              name="inventario"
              value={product.checked ? product.checked.slice(0, 10) : ""}
              className="col-8 fs-2 ms-3 value"
              readOnly
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default NegativeListDetailsProductPage;
