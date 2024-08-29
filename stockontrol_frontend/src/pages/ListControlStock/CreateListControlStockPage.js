import React, { useState } from "react";
import { Link } from "react-router-dom";
import CreateHeader from "../../components/Headers/CreateHeader";
import labels from "../../config/labels";
import SideBar from "../../components/SideBar/SideBar";
import Axios from "axios";
import Input from "../../common/Input/Input";
import Typography from "../../common/Typography/Typography";
import Button from "react-bootstrap/Button";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { BsPlusCircle } from "react-icons/bs";

const CreateListControlStockPage = ({ onLogout }) => {
  const [listControlStockName, setListControlStockName] = useState("");
  const [statusId, setStatusId] = useState("3");
  const [products, setProducts] = useState([]);
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [productName, setProductName] = useState("");
  const [supplier, setSupplier] = useState("");
  const [category, setCategory] = useState("");
  const [productsList, setProductsList] = useState([]);
  const [warningMessage, setWarningMessage] = useState("");
  const [noResultsMessage, setNoResultsMessage] = useState("");
  const [showProductsList, setShowProductsList] = useState(false);

  const normalizeName = (name) => name.toLowerCase().replace(/\s+/g, "");

  const validInputs = () => {
    return listControlStockName.trim() !== "";
  };

  const deleteProductFromList = (productId) => {
    const productToRemove = products.find(
      (product) => product.product_id === productId
    );

    if (productToRemove) {
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.product_id !== productId)
      );
      setProductsList((prevProductsList) => [
        ...prevProductsList,
        productToRemove,
      ]);
    }
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
      setTimeout(() => {
        setWarningMessage("");
      }, 5000);

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

  const addProductToList = (product) => {
    setProducts((prevProducts) => [...prevProducts, product]);
    setProductsList((prevProductsList) =>
      prevProductsList.filter((p) => p.product_id !== product.product_id)
    );
  };

  const checkNameUniqueness = () => {
    const normalizedListName = normalizeName(listControlStockName);

    return Axios.get("http://localhost:8080/api/v1/checkName", {
      params: { name: normalizedListName },
    })
      .then((response) => response.data.isUnique)
      .catch((error) => {
        console.error("Error checking list name uniqueness:", error);
        return false;
      });
  };

  const createListControlStock = () => {
    if (!validInputs()) {
      setConfirmationMessage("Se necesita un nombre a la lista para crearla");
      setMessageType("danger");
      return;
    }

    checkNameUniqueness().then((isUnique) => {
      if (!isUnique) {
        setConfirmationMessage(
          "El nombre de la lista ya existe, elija un nombre diferente."
        );
        setMessageType("danger");
        return;
      }

      Axios.post("http://localhost:8080/api/v1/listsControlStock/create", {
        stockControlListName: listControlStockName,
        statusId: statusId,
        products: products.map((product) => product.product_id),
      })
        .then((response) => {
          setProducts([]);
          setListControlStockName("");
          setConfirmationMessage(
            `La lista ${listControlStockName} fue creada exitosamente!`
          );
          setMessageType("primary");
          setTimeout(() => {
            setConfirmationMessage("");
          }, 5000);
        })
        .catch((error) => {
          console.error("Error al crear la lista !", error);
          setConfirmationMessage(
            "Se necesita minimo un producto a la lista para crearla"
          );
          setMessageType("danger");
          setTimeout(() => {
            setConfirmationMessage("");
          }, 5000);
        });
    });
  };

  const toggleProductsList = () => {
    setShowProductsList((prev) => !prev);
  };

  return (
    <>
      <CreateHeader
        text={labels.PAGES.LISTA_CONTROL_STOCK.CREATE_LISTA_CONTROL_STOCK_PAGE}
        pathSearch={"/listControlStock/search"}
        backButtonName={labels.BUTTONS.BACK_BUTTON}
      />
      <div className="row align-items-start container_principal">
        <div className="col-2 sideBar_container">
          <SideBar onLogout={onLogout} />
        </div>
        <div className="offset-1 col-9 mt-5">
          <div className="frame">
            <div className="value_label_container mb-4">
              <Typography
                level="p"
                text="NOMBRE LISTA"
                className="label col-2 fw-bold"
              />
              <Input
                type="text"
                name="listControlStockName"
                value={listControlStockName}
                onChange={(e) => setListControlStockName(e.target.value)}
                className="col-8 fs-2 ms-3 value"
              />
            </div>
            {confirmationMessage && (
              <div
                className={`alert fs-3 mt-4 ${
                  messageType === "danger" ? "alert-danger" : "alert-success"
                }`}
                role="alert"
              >
                {confirmationMessage}
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
                    <th className="col-2">Eliminar</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product, idx) => (
                    <tr key={idx}>
                      <td>
                        <Link
                          to="/product/alternativeDetails"
                          state={{ product }}
                        >
                          {product.product_name}
                        </Link>
                      </td>
                      <td>{product.stock}</td>
                      <td>{product.stock_real || "No contado"}</td>
                      <td>{product.supplier_name}</td>
                      <td>{product.category_name}</td>
                      <td className="table-icon">
                        <RiDeleteBin6Fill
                          className="icon custom_icon"
                          size={"1.3em"}
                          onClick={() =>
                            deleteProductFromList(product.product_id)
                          }
                          data-testid="delete-icon"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Button
              variant="secondary"
              size="lg"
              className="text-white border-dark mt-5 offset-3 col-2"
              onClick={toggleProductsList}
            >
              {showProductsList
                ? labels.BUTTONS.HIDE_PRODUCTS_LIST
                : labels.BUTTONS.ADD_PRODUCT}
            </Button>
            <Button
              variant="secondary"
              size="lg"
              className="text-white border-dark mt-5 offset-2 col-2"
              onClick={createListControlStock}
            >
              {labels.BUTTONS.SAVE_BUTTON}
            </Button>
          </div>

          {showProductsList && (
            <div className="col-12 mt-5 frame">
              <div className="value_label_container mb-4">
                <Typography
                  level="p"
                  text="NOMBRE"
                  className="label col-2 fw-bold"
                ></Typography>

                <Input
                  type="text"
                  name="productName"
                  value={productName}
                  placeholder="Ingrese el nombre del producto a buscar"
                  className="col-8 fs-2 ms-3 value"
                  onChange={(e) => {
                    setProductName(e.target.value);
                  }}
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
                  name="supplierName"
                  value={supplier}
                  placeholder="Ingrese el nombre del proveedor a buscar"
                  className="col-8 fs-2 ms-3 value"
                  onChange={(e) => {
                    setSupplier(e.target.value);
                  }}
                />
              </div>
              <div className="value_label_container">
                <Typography
                  level="p"
                  text="CATEGORIA"
                  className="label col-2 fw-bold"
                ></Typography>

                <Input
                  type="text"
                  name="categoryName"
                  value={category}
                  placeholder="Ingrese el nombre de la categoría a buscar"
                  className="col-8 fs-2 ms-3 value"
                  onChange={(e) => {
                    setCategory(e.target.value);
                  }}
                />
              </div>
              {warningMessage && (
                <div className="alert alert-danger fs-3 mt-4" role="alert">
                  {warningMessage}
                </div>
              )}
              <Button
                variant="secondary"
                size="lg"
                className="text-white border-dark mt-5 offset-3 col-2"
                onClick={deleteResultsList}
              >
                Borrar Lista
              </Button>
              <Button
                variant="secondary"
                size="lg"
                className="text-white border-dark mt-5 offset-2 col-2"
                onClick={searchProduct}
              >
                Buscar
              </Button>

              <div className="separator my-4 offset-1 col-10"></div>

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
                          <th className="col-1 table-icon">
                            Añadir a la lista
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {groupedBySupplier[supplier].map((val, idx) => (
                          <tr key={idx}>
                            <td>
                              <Link
                                to={"/product/details"}
                                state={{ product: val }}
                              >
                                {val.product_name}
                              </Link>
                            </td>
                            <td>{val.stock}</td>
                            <td>{val.category_name}</td>
                            <td className="table-icon">
                              <BsPlusCircle
                                className="icon custom_icon"
                                size={"1.3em"}
                                onClick={() => addProductToList(val)}
                                data-testid="view-icon"
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
          )}
        </div>
      </div>
    </>
  );
};

export default CreateListControlStockPage;
