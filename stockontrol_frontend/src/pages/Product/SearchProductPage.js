import React, { useState, useEffect } from "react";
import SearchHeader from "../../components/Headers/SearchHeader";
import labels from "../../config/labels";
import SideBar from "../../components/SideBar/SideBar";
import Axios from "axios";

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

  return (
    <>
      <SearchHeader
        text={labels.PRODUCT.SEARCH_PRODUCT_PAGE}
        pathCreate={"/product/create"}
      />
      <div className="row align-items-start" style={{ height: "100vh" }}>
        <div className="col-2" style={{ height: "100%" }}>
          <SideBar />
        </div>
        <div
          className="col-10 mt-4"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <label>Nombre del Producto</label>
          <input
            type="text"
            name="productName"
            className="mb-2"
            style={{ width: 300, height: 60, fontSize: 25 }}
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
      </div>
    </>
  );
};

export default SearchProductPage;
