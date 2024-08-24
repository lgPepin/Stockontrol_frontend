import React, { useState } from "react";
import ActiveHeader from "../../components/Headers/ActiveHeader";
import labels from "../../config/labels";
import SideBar from "../../components/SideBar/SideBar";
import Typography from "../../common/Typography/Typography";
import Input from "../../common/Input/Input";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import axios from "axios";

const DetailsListControlStockPage = () => {
  const location = useLocation();
  const listControlStock = location.state?.listControlStock || {};
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [productsInfo, setProductsInfo] = useState(
    listControlStock.products_info || []
  );
  const [stockReal, setStockReal] = useState(productsInfo[0]?.stock_real || "");

  const currentProduct = productsInfo[currentIndex] || {};

  const handleStockRealChange = (event) => {
    setStockReal(event.target.value);
  };

  const handleNext = (listControlStock) => {
    if (currentIndex < productsInfo.length - 1) {
      const updatedProductsInfo = [...productsInfo];
      updatedProductsInfo[currentIndex].stock_real = stockReal;
      setProductsInfo(updatedProductsInfo);
      setCurrentIndex(currentIndex + 1);
      setStockReal(productsInfo[currentIndex + 1]?.stock_real || "");
    } else {
      handleFinish(listControlStock);
    }
  };

  const handleFinish = (listControlStock) => {
    const updatedProductsInfo = [...productsInfo];
    updatedProductsInfo[currentIndex].stock_real = stockReal;
    const controlDate = new Date().toISOString();
    const productsWithDate = updatedProductsInfo.map((product) => ({
      ...product,
      control_date: controlDate,
    }));

    terminateStockControlList(
      listControlStock.stock_control_list_id,
      listControlStock.stock_control_list_name,
      productsWithDate
    );
  };

  const terminateStockControlList = async (listId, listName, products) => {
    try {
      const response = await axios.put(
        `http://localhost:8080/api/v1/listsControlStock/terminate/${listId}`,
        {
          products,
        }
      );

      if (response.status === 200) {
        navigate("/listControlStock/search", {
          state: {
            successMessage: `La lista de control de stock ${listName} fue terminada exitosamente y los datos asociados fueron actualizados exitosamente`,
          },
        });
      }
    } catch (error) {
      setErrorMessage("Error al guardar los datos.");
    }
  };

  const handleCancel = async (listControlStock) => {
    try {
      const response = await axios.patch(
        `http://localhost:8080/api/v1/listsControlStock/cancel/${listControlStock.stock_control_list_id}`,
        {
          status: "No activada",
        }
      );

      if (response.status === 200) {
        navigate("/listControlStock/search");
      }
    } catch (error) {
      setErrorMessage("Error al cancelar la lista.");
    }
  };

  return (
    <>
      <ActiveHeader
        text={labels.PAGES.LISTA_CONTROL_STOCK.ACTIVE_LISTA_CONTROL_STOCK_PAGE}
      />
      <div className="row align-items-start container_principal">
        <div className="col-2 sideBar_container">
          <SideBar />
        </div>
        <div className="offset-1 col-9 mt-5 frame">
          <div className="value_label_container mb-4">
            <Typography
              level="p"
              text="NOMBRE PRODUCTO"
              className="label col-2 fw-bold"
            />
            <Input
              type="text"
              name="productName"
              value={currentProduct.product_name || ""}
              className="col-8 fs-2 ms-3 value"
              readOnly
            />
          </div>
          <div className="value_label_container mb-4">
            <Typography
              level="p"
              text="STOCK SISTEMA"
              className="label col-2 fw-bold"
            />
            <Input
              type="text"
              name="stockSystem"
              value={currentProduct.stock_system || ""}
              className="col-8 fs-2 ms-3 value"
              readOnly
            />
          </div>
          <div className="value_label_container mb-4">
            <Typography
              level="p"
              text="STOCK FISICO"
              className="label col-2 fw-bold"
            />
            <Input
              type="text"
              name="stockReal"
              value={stockReal}
              onChange={handleStockRealChange}
              className="col-8 fs-2 ms-3 value"
            />
          </div>
          <Button
            variant="secondary"
            size="lg"
            className="text-black border-dark mt-5 offset-3 col-2"
            onClick={() => handleCancel(listControlStock)}
          >
            Cancelar
          </Button>
          <Button
            variant="secondary"
            size="lg"
            className="text-black border-dark mt-5 offset-2 col-2"
            onClick={() => handleNext(listControlStock)}
          >
            {currentIndex < productsInfo.length - 1 ? "Siguiente" : "Terminar"}
          </Button>
          {errorMessage && (
            <div className="alert alert-danger fs-3 mt-4" role="alert">
              {errorMessage}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default DetailsListControlStockPage;
