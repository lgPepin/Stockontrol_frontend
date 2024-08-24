import React, { useState, useEffect } from "react";
import SearchHeader from "../../components/Headers/SearchHeader";
import labels from "../../config/labels";
import SideBar from "../../components/SideBar/SideBar";
import Axios from "axios";
import Input from "../../common/Input/Input";
import "./SearchProductPage.css";
import Typography from "../../common/Typography/Typography";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { BsFillPencilFill } from "react-icons/bs";
import { FaEye } from "react-icons/fa";
import Button from "react-bootstrap/esm/Button";
import { Link, useNavigate } from "react-router-dom";

const SearchProductPage = () => {
  const [productName, setProductName] = useState("");
  const [supplier, setSupplier] = useState("");
  const [category, setCategory] = useState("");
  const [productsList, setProductsList] = useState([]);
  const [warningMessage, setWarningMessage] = useState("");
  const [noResultsMessage, setNoResultsMessage] = useState("");
  const [successDeleteMessage, setSuccessDeleteMessage] = useState("");
  const [errorDeleteMessage, setErrorDeleteMessage] = useState("");

  const navigate = useNavigate();

  const goToDetailsProductPage = (product) => {
    navigate("/product/details", { state: { product } });
  };

  const goToUpdateProductPage = (product) => {
    console.log("Je cherche product: ", product);
    navigate("/product/update", {
      state: { product },
    });
  };

  const searchProduct = () => {
    if (
      (productName.length > 0 && productName.length < 3) ||
      (supplier.length > 0 && supplier.length < 3) ||
      (category.length > 0 && category.length < 3)
    ) {
      setWarningMessage(
        "Por favor ingresar al menos 3 caracteres para iniciar la busqueda"
      );
      setNoResultsMessage("");
      return;
    }

    setWarningMessage("");

    Axios.get("http://localhost:8080/api/v1/get", {
      params: {
        searchProductName: productName,
        searchSupplier: supplier,
        searchCategory: category,
      },
    })
      .then((response) => {
        if (response.data.length === 0) {
          setNoResultsMessage("Producto no encontrado");
        } else {
          setNoResultsMessage("");
        }

        setProductsList(response.data || []);
      })
      .catch((error) => {
        console.error("Error en la búsqueda de productos :", error);
      });
  };

  // const deleteProduct = (productName) => {
  //   Axios.delete(`http://localhost:8080/api/v1/delete/${productName}`)
  //     .then((response) => {
  //       setSuccessDeleteMessage(response.data.message);
  //       setProductsList((prevList) =>
  //         prevList.filter((product) => product.product_name !== productName)
  //       );
  //       setTimeout(() => {
  //         setSuccessDeleteMessage("");
  //       }, 5000);
  //       return;
  //     })
  //     .catch((error) => {
  //       console.error("Error al eliminar el producto :", error);
  //       setErrorDeleteMessage(
  //         error.response?.data?.message || "Error a la supresión del producto"
  //       );
  //       setTimeout(() => {
  //         setErrorDeleteMessage("");
  //       }, 5000);
  //       return;
  //     });
  // };

  const deleteProduct = (productId, productName) => {
    if (isNaN(productId)) {
      console.error("Product ID must be an integer");
      return;
    }

    Axios.delete(`http://localhost:8080/api/v1/delete/${productId}`)
      .then((response) => {
        setSuccessDeleteMessage(response.data.message);
        setProductsList((prevList) =>
          prevList.filter((product) => product.product_id !== productId)
        );
        setTimeout(() => {
          setSuccessDeleteMessage("");
        }, 5000);
      })
      .catch((error) => {
        console.error("Error al eliminar el producto :", error);
        setErrorDeleteMessage(
          error.response?.data?.message || "Error a la supresión del producto"
        );
        setTimeout(() => {
          setErrorDeleteMessage("");
        }, 5000);
      });
  };

  const groupedBySupplier = productsList.reduce((acc, product) => {
    const supplier = product.supplier_name || "Proveedor no conocido";
    if (!acc[supplier]) {
      acc[supplier] = [];
    }
    acc[supplier].push(product);
    return acc;
  }, {});

  const deleteResultsList = () => {
    setProductsList([]);
    setProductName("");
    setSupplier("");
    setCategory("");
    setNoResultsMessage("");
  };

  return (
    <>
      <SearchHeader
        text={labels.PAGES.PRODUCT.SEARCH_PRODUCT_PAGE}
        pathCreate={"/product/create"}
        createButtonName={labels.BUTTONS.CREATE_PRODUCT_BUTTON}
      />
      <div className="row align-items-start container_principal">
        <div className="col-2 sideBar_container">
          <SideBar />
        </div>
        <div className="offset-1 col-9 mt-4 ">
          <div className="value_label_container mb-4">
            <Typography
              level="p"
              text="NOMBRE"
              className="label col-1 fw-bold"
            ></Typography>

            <Input
              type="text"
              name="productName"
              value={productName}
              placeholder="Ingrese el nombre del producto a buscar"
              className="col-9 fs-2 ms-3 value"
              onChange={(e) => {
                setProductName(e.target.value);
              }}
            />
          </div>
          <div className="value_label_container mb-4 ">
            <Typography
              level="p"
              text="PROVEEDOR"
              className="label col-1 fw-bold"
            ></Typography>

            <Input
              type="text"
              name="supplierName"
              value={supplier}
              placeholder="Ingrese el nombre del proveedor a buscar"
              className="col-9 fs-2 ms-3 value"
              onChange={(e) => {
                setSupplier(e.target.value);
              }}
            />
          </div>
          <div className="value_label_container">
            <Typography
              level="p"
              text="CATEGORIA"
              className="label col-1 fw-bold"
            ></Typography>

            <Input
              type="text"
              name="categoryName"
              value={category}
              placeholder="Ingrese el nombre de la categoría a buscar"
              className="col-9 fs-2 ms-3 value"
              onChange={(e) => {
                setCategory(e.target.value);
              }}
            />
          </div>
          <Button
            variant="secondary"
            size="lg"
            className="text-black border-dark mt-5 offset-2 col-2"
            onClick={deleteResultsList}
          >
            Borrar Lista
          </Button>
          <Button
            variant="secondary"
            size="lg"
            className="text-black border-dark mt-5 offset-2 col-2"
            onClick={searchProduct}
          >
            Buscar
          </Button>
          {warningMessage && (
            <Typography
              level="p"
              text={warningMessage}
              className="text-danger mt-3 fs-3"
            />
          )}

          {successDeleteMessage && (
            <Typography
              level="p"
              text={successDeleteMessage}
              className="text-primary mt-3 fs-3"
            />
          )}

          <div className="separator my-4 col-10"></div>

          {noResultsMessage ? (
            <Typography
              level="h3"
              text={noResultsMessage}
              className="text-danger mt-5 offset-3 fw-bold fs-1"
            />
          ) : (
            Object.keys(groupedBySupplier).map((supplier, index) => (
              <div key={index}>
                <Typography
                  level="h4"
                  text={`Proveedor: ${supplier}`}
                  className="mt-4 mb-1"
                />
                <table className="table table-striped table_size">
                  <thead>
                    <tr>
                      <th className="col-2">Nombre Producto</th>
                      <th className="col-1">Stock</th>
                      <th className="col-1">Categoria</th>
                      <th className="col-1 table-icon">Ver</th>
                      <th className="col-1 table-icon">Editar</th>
                      <th className="col-1 table-icon">Eliminar</th>
                    </tr>
                  </thead>
                  <tbody>
                    {groupedBySupplier[supplier].map((val, idx) => (
                      <tr key={idx}>
                        <td>
                          <Link
                            to={"/product/details"}
                            state={{ product: val, fromSearchPage: true }}
                          >
                            {val.product_name}
                          </Link>
                        </td>
                        <td>{val.stock}</td>
                        <td>{val.category_name}</td>
                        <td className="table-icon">
                          <FaEye
                            className="icon custom_icon"
                            size={"1.3em"}
                            onClick={() => goToDetailsProductPage(val)}
                            data-testid="view-icon"
                          />
                        </td>
                        <td className="table-icon">
                          <BsFillPencilFill
                            className="icon custom_icon"
                            size={"1.3em"}
                            onClick={() => {
                              console.log("Product clicked: ", val);
                              goToUpdateProductPage(val);
                            }}
                          />
                        </td>
                        <td className="table-icon">
                          <RiDeleteBin6Fill
                            className="icon custom_icon"
                            size={"1.3em"}
                            onClick={() => deleteProduct(val.product_id)}
                            data-testid="delete-icon"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default SearchProductPage;
