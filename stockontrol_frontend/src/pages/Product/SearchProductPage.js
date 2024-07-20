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

const SearchProductPage = () => {
  const [productName, setProductName] = useState("");
  const [supplier, setSupplier] = useState("");
  const [productsList, setProductsList] = useState([]);
  const [newSupplier, setNewSupplier] = useState("");

  useEffect(() => {
    Axios.get("http://localhost:8080/api/get").then((response) => {
      setProductsList(response.data.rows);
      console.log(response.data.rows);
    });
  }, []);

  const submitProduct = () => {
    Axios.post("http://localhost:8080/api/insert", {
      productName: productName,
      supplier: supplier,
    });

    setProductsList([
      ...productsList,
      { productname: productName, supplier: supplier },
    ]);
  };

  const deleteProduct = (productName) => {
    Axios.delete(`http://localhost:8080/api/delete/${productName}`);

    setProductsList((prevList) =>
      prevList.filter((product) => product.productname !== productName)
    );
  };

  const updateProduct = (product) => {
    Axios.put("http://localhost:8080/api/update", {
      productname: product,
      supplier: newSupplier,
    });

    setProductsList((prevList) =>
      prevList.map((prod) =>
        prod.productname === product ? { ...prod, supplier: newSupplier } : prod
      )
    );
    setNewSupplier("");
  };

  const groupedBySupplier = productsList.reduce((acc, product) => {
    const supplier = product.supplier || "Unknown Supplier";
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
              className="w-75 fs-2 ms-3 value"
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
              className="w-75 fs-2 ms-3 value"
              onChange={(e) => {
                setProductName(e.target.value);
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
              className="w-75 fs-2 ms-3 value"
              onChange={(e) => {
                setProductName(e.target.value);
              }}
            />
          </div>

          <div className="separator my-4 col-10"></div>

          {Object.keys(groupedBySupplier).map((supplier, index) => (
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
                      <td>{val.productname}</td>
                      <td>{val.stock}</td>
                      <td>{val.category}</td>
                      <td className="table-icon">
                        <FaEye className="icon" size={"1.3em"} />
                      </td>
                      <td className="table-icon">
                        <BsFillPencilFill
                          className="icon"
                          size={"1.3em"}
                          onClick={() => updateProduct(val.productname)}
                        />
                      </td>
                      <td className="table-icon">
                        <RiDeleteBin6Fill
                          className="icon"
                          size={"1.3em"}
                          onClick={() => deleteProduct(val.productname)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
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
