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
  const [newSupplier, setNewSupplier] = useState("");
  const [warningMessage, setWarningMessage] = useState("");
  const [noResultsMessage, setNoResultsMessage] = useState("");

  const navigate = useNavigate();

  const goToDetailsProductPage = (product) => {
    navigate("/product/details", { state: { product } });
  };

  const goToUpdateProductPage = (product) => {
    navigate("/product/update", { state: { product } });
  };

  // useEffect(() => {
  //   Axios.get("http://localhost:8080/api/get").then((response) => {
  //     setProductsList(response.data.rows);
  //     console.log(response.data.rows);
  //   });
  // }, []);

  const searchProduct = () => {
    // Vérifiez si les champs de recherche sont valides
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

    // Réinitialiser les messages d'avertissement et de résultat
    setWarningMessage("");

    // Effectuer la requête GET avec les paramètres de recherche
    Axios.get("http://localhost:8080/api/get", {
      params: {
        searchProductName: productName,
        searchSupplier: supplier,
        searchCategory: category,
      },
    })
      .then((response) => {
        // Vérifiez si la réponse contient des résultats
        if (response.data.length === 0) {
          setNoResultsMessage("No producto encontrado");
        } else {
          setNoResultsMessage("");
        }
        // Mettre à jour la liste des produits
        setProductsList(response.data || []);
      })
      .catch((error) => {
        console.error("Error en la búsqueda de productos :", error);
      });
  };

  // const submitProduct = () => {
  //   Axios.post("http://localhost:8080/api/insert", {
  //     productName: productName,
  //     supplier: supplier,
  //   });

  //   setProductsList([
  //     ...productsList,
  //     { productname: productName, supplier: supplier },
  //   ]);
  // };

  const deleteProduct = (productName) => {
    Axios.delete(`http://localhost:8080/api/delete/${productName}`);

    setProductsList((prevList) =>
      prevList.filter((product) => product.product_name !== productName)
    );
  };

  const updateProduct = (product) => {
    Axios.put("http://localhost:8080/api/update", {
      product_name: product,
      supplier: newSupplier,
    });

    setProductsList((prevList) =>
      prevList.map((prod) =>
        prod.product_name === product
          ? { ...prod, supplier: newSupplier }
          : prod
      )
    );
    setNewSupplier("");
  };

  const groupedBySupplier = productsList.reduce((acc, product) => {
    const supplier = product.supplier || "Proveedor no conocido";
    if (!acc[supplier]) {
      acc[supplier] = [];
    }
    acc[supplier].push(product);
    return acc;
  }, {});

  return (
    <>
      <SearchHeader
        text={labels.PRODUCT.SEARCH_PRODUCT_PAGE}
        pathCreate={"/product/create"}
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
              name="productName"
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
              name="productName"
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
            className="text-black border-dark mt-5 offset-4 col-2"
            onClick={searchProduct}
          >
            Buscar
          </Button>
          {warningMessage && (
            <Typography
              level="p"
              text={warningMessage}
              className="text-danger mt-3"
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
                      <th className="col-2">Nombre</th>
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
                            state={{ product: val }}
                          >
                            {val.product_name}
                          </Link>
                        </td>
                        <td>{val.stock}</td>
                        <td>{val.category}</td>
                        <td className="table-icon">
                          <FaEye
                            className="icon custom_icon"
                            size={"1.3em"}
                            onClick={() => goToDetailsProductPage(val)}
                          />
                        </td>
                        <td className="table-icon">
                          <BsFillPencilFill
                            className="icon custom_icon"
                            size={"1.3em"}
                            onClick={() => goToUpdateProductPage(val)}
                          />
                        </td>
                        <td className="table-icon">
                          <RiDeleteBin6Fill
                            className="icon custom_icon"
                            size={"1.3em"}
                            onClick={() => deleteProduct(val.product_name)}
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

      {/* <div className="row align-items-start" style={{ height: "100vh" }}>
        <div className="col-2" style={{ height: "100%" }}>
          <SideBar />
        </div>
        <div
          className="col-10 mt-4"
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div className="d-flex align-items-center justify-content-center">
            <Typography
              level="p"
              text="NOMBRE"
              className="fs-3 label"
            ></Typography>

            <Input
              type="text"
              name="productName"
              placeholder="Ingrese el nombre del producto a buscar"
              className="w-50 fs-2 ms-3 input"
              onChange={(e) => {
                setProductName(e.target.value);
              }}
            />
          </div>
          <Typography level="p" text="PROVEEDOR" className="fs-3"></Typography>
          <Input
            type="text"
            name="productName"
            placeholder="Ingrese el nombre del producto a buscar"
            className="w-50 fs-2 input"
            onChange={(e) => {
              setProductName(e.target.value);
            }}
          />
          <Typography level="p" text="CATEGORIA" className="fs-3"></Typography>
          <Input
            type="text"
            name="productName"
            placeholder="Ingrese el nombre del producto a buscar"
            className="w-50 fs-2 input"
            onChange={(e) => {
              setProductName(e.target.value);
            }}
          />
          <label>Nombre del Proveedor</label>
          <input
            type="text"
            name="supplierName"
            className="mb-4"
            style={{ width: 300, height: 60, fontSize: 25 }}
            onChange={(e) => {
              setSupplier(e.target.value);
            }}
          />

          <button onClick={submitProduct}>Submit</button>

          {productsList.map((val, index) => {
            return (
              <div
                className="card"
                key={index}
                style={{
                  width: 500,
                  height: 150,
                  border: "2px solid black",
                  borderRadius: 15,
                  margin: 10,
                  textAlign: "center",
                  fontFamily:
                    '"Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande", "Lucida Sans", "Arial", "sans-serif"',
                }}
              >
                <h1>{val.productname} </h1>
                <p>{val.supplier}</p>

                <div
                  style={{
                    display: "flex ",
                    justifyContent: "space-around",
                  }}
                >
                  <button
                    style={{ width: "100px", height: "30px" }}
                    onClick={() => {
                      deleteProduct(val.productname);
                    }}
                  >
                    Delete
                  </button>
                  <input
                    type="text"
                    id="upsateInput"
                    style={{ width: 200, height: 20, marginBottom: 10 }}
                    onChange={(e) => setNewSupplier(e.target.value)}
                    value={newSupplier}
                  />
                  <button
                    style={{ width: "100px", height: "30px" }}
                    onClick={() => {
                      updateProduct(val.productname);
                    }}
                  >
                    Update
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div> */}
    </>
  );
};

export default SearchProductPage;
