import React, { useState } from "react";
import DetailsHeader from "../../components/Headers/DetailsHeader";
import labels from "../../config/labels";
import SideBar from "../../components/SideBar/SideBar";
import Typography from "../../common/Typography/Typography";
import Input from "../../common/Input/Input";
import { useLocation, useNavigate, Link } from "react-router-dom";

const DetailsListControlStockPage = ({ onLogout }) => {
  const location = useLocation();
  const listControlStock = location.state?.listControlStock || {};
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const goToUpdateListControlStockPage = (listControlStock) => {
    if (listControlStock.stock_control_list_status === "No activada") {
      navigate("/listControlStock/update", { state: { listControlStock } });
    } else {
      setErrorMessage(
        "Solo se puede editar las listas de control de stock con un estado No activada"
      );
      setTimeout(() => {
        setErrorMessage("");
      }, 5000);
    }
  };

  return (
    <>
      <DetailsHeader
        text={labels.PAGES.LISTA_CONTROL_STOCK.DETAILS_LISTA_CONTROL_STOCK_PAGE}
        pathSearch={"/listControlStock/search"}
        pathCreate={"/listControlStock/create"}
        onClick={() => goToUpdateListControlStockPage(listControlStock)}
        backButtonName={labels.BUTTONS.BACK_BUTTON}
        editButtonName={labels.BUTTONS.EDIT_LIST_CONTROL_STOCK_BUTTON}
        createButtonName={labels.BUTTONS.CREATE_LIST_CONTROL_STOCK_BUTTON}
      />
      <div className="row align-items-start container_principal">
        <div className="col-2 sideBar_container">
          <SideBar onLogout={onLogout} />
        </div>
        <div className="offset-1 col-9 mt-5 frame">
          <div className="value_label_container mb-4">
            <Typography
              level="p"
              text="NOMBRE LISTA"
              className="label col-2 fw-bold"
            />

            <Input
              type="text"
              name="listControlStockName"
              value={listControlStock.stock_control_list_name || ""}
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
              value={listControlStock.stock_control_list_status || ""}
              className="col-8 fs-2 ms-3 value"
              readOnly
            />
          </div>
          {errorMessage && (
            <div className="alert alert-danger fs-3 mt-4" role="alert">
              {errorMessage}
            </div>
          )}
          <div>
            <table className="table table-striped table_size">
              <thead>
                <tr>
                  <th className="col-2">Nombre Producto</th>
                  <th className="col-2">Stock sistema</th>
                  <th className="col-2">Stock fisico</th>
                  <th className="col-2">Proveedor</th>
                  <th className="col-2">Categoria</th>
                </tr>
              </thead>
              <tbody>
                {listControlStock.products_info?.map((product, idx) => (
                  <tr key={idx}>
                    <td>
                      <Link
                        to="/product/alternativeDetails"
                        state={{ product }}
                      >
                        {product.product_name}
                      </Link>
                    </td>
                    <td>{product.stock_system}</td>
                    <td>{product.stock_real || "No contado"}</td>
                    <td>{product.supplier_name}</td>
                    <td>{product.category_name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};
export default DetailsListControlStockPage;
