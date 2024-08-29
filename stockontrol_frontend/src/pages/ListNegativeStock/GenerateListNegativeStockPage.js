import React, { useState } from "react";
import GenerateHeader from "../../components/Headers/GenerateHeader";
import labels from "../../config/labels";
import SideBar from "../../components/SideBar/SideBar";
import Axios from "axios";
import { FaEye } from "react-icons/fa";
import Button from "react-bootstrap/esm/Button";
import { Link, useNavigate } from "react-router-dom";

const GenerateListNegativeStockPage = ({ onLogout }) => {
  const [productsList, setProductsList] = useState([]);
  const [warningMessage, setWarningMessage] = useState("");
  const [noResultsMessage, setNoResultsMessage] = useState("");
  const navigate = useNavigate();

  const goToDetailsProductPage = (product) => {
    navigate("/product/negativeListDetails", { state: { product } });
  };

  const generateNegativeStockList = () => {
    Axios.get(
      "http://localhost:8080/api/v1/listNegativeStock/products/negativeStock"
    )
      .then((response) => {
        if (response.data.length === 0) {
          setNoResultsMessage("No existe producto con un stock negativo");
        } else {
          setNoResultsMessage("");
          setProductsList(response.data);
        }
      })
      .catch((error) => {
        console.error("Error al generar la lista:", error);
        setWarningMessage("Error al generar la lista");
      });
  };

  return (
    <>
      <GenerateHeader
        text={
          labels.PAGES.LISTA_NEGATIVE_STOCK.GENERATE_LISTA_NEGATIVE_STOCK_PAGE
        }
        pathSearch={"/product/search"}
        backButtonName={labels.BUTTONS.BACK_BUTTON}
      />
      <div className="row align-items-start container_principal">
        <div className="col-2 sideBar_container">
          <SideBar onLogout={onLogout} />
        </div>
        <div className="offset-1 col-9 mt-4 ">
          <Button
            variant="secondary"
            size="lg"
            className="text-white border-dark mt-5 offset-4 col-2"
            onClick={generateNegativeStockList}
          >
            {labels.BUTTONS.GENERATE_LIST_BUTTON}
          </Button>
          {warningMessage && (
            <div
              className={"alert fs-3 mt-4 alert-danger text-center"}
              role="alert"
            >
              {warningMessage}
            </div>
          )}

          <div className="separator my-4 col-10"></div>

          {noResultsMessage ? (
            <div
              className={"alert fs-3 mt-4 alert-danger text-center"}
              role="alert"
            >
              {noResultsMessage}
            </div>
          ) : (
            <table className="table table-striped table_size">
              <thead>
                <tr>
                  <th className="col-2">Nombre Producto</th>
                  <th className="col-1">Stock</th>
                  <th className="col-1">Proveedor</th>
                  <th className="col-1">Categoria</th>
                  <th className="col-1 table-icon">Ver</th>
                </tr>
              </thead>
              <tbody>
                {productsList.map((product, index) => (
                  <tr key={index}>
                    <td>
                      <Link
                        to={"/product/negativeListDetails"}
                        state={{ product: product, fromSearchPage: true }}
                      >
                        {product.product_name}
                      </Link>
                    </td>
                    <td>{product.stock}</td>
                    <td>{product.supplier_name}</td>
                    <td>{product.category_name}</td>
                    <td className="table-icon">
                      <FaEye
                        className="icon custom_icon"
                        size={"1.3em"}
                        onClick={() => goToDetailsProductPage(product)}
                        data-testid="view-icon"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default GenerateListNegativeStockPage;
