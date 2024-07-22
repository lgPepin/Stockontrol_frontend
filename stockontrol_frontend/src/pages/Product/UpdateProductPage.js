import React, { useState } from "react";
import UpdateHeader from "../../components/Headers/UpdateHeader";
import labels from "../../config/labels";
import SideBar from "../../components/SideBar/SideBar";
import Axios from "axios";
import Input from "../../common/Input/Input";
import Typography from "../../common/Typography/Typography";
import Button from "react-bootstrap/Button";
import { useLocation } from "react-router-dom";

const UpdateProductPage = () => {
  const location = useLocation();
  const product = location.state?.product || {};

  const [productName, setProductName] = useState(product.product_name || "");
  const [supplier, setSupplier] = useState(product.supplier || "");
  const [category, setCategory] = useState(product.category || "");
  const [stock, setStock] = useState(product.stock || "");
  const [purchasePrice, setPurchasePrice] = useState(
    product.purchase_price || ""
  );
  const [sellingPrice, setSellingPrice] = useState(product.selling_price || "");
  const [status, setStatus] = useState(product.status || "");

  const submitProduct = () => {
    Axios.put(`http://localhost:8080/api/update/${product.product_id}`, {
      product_name: productName,
      supplier: supplier,
      category: category,
      stock: stock,
      purchase_price: purchasePrice,
      selling_price: sellingPrice,
      status: status,
    });

    setProductName("");
    setSupplier("");
    setCategory("");
    setStock("");
    setPurchasePrice("");
    setSellingPrice("");
    setStatus("");
  };

  return (
    <>
      <UpdateHeader
        text={labels.PRODUCT.UPDATE_PRODUCT_PAGE}
        pathSearch={"/"}
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
            ></Typography>

            <Input
              type="text"
              name="productName"
              value={productName}
              placeholder="Ingrese el nombre del producto a crear"
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
              name="supplier"
              value={supplier}
              placeholder="Ingrese el nombre del proveedor"
              className="col-8 fs-2 ms-3 value"
              onChange={(e) => {
                setSupplier(e.target.value);
              }}
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
              value={category}
              placeholder="Ingrese el nombre de la categoría"
              className="col-8 fs-2 ms-3 value"
              onChange={(e) => {
                setCategory(e.target.value);
              }}
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
              value={stock}
              placeholder="Ingrese la cantidad en stock"
              className="col-8 fs-2 ms-3 value"
              onChange={(e) => {
                setStock(e.target.value);
              }}
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
              value={purchasePrice}
              placeholder="Ingrese el precio de compra"
              className="col-8 fs-2 ms-3 value"
              onChange={(e) => {
                setPurchasePrice(e.target.value);
              }}
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
              value={sellingPrice}
              placeholder="Ingrese el precio de venta"
              className="col-8 fs-2 ms-3 value"
              onChange={(e) => {
                setSellingPrice(e.target.value);
              }}
            />
          </div>
          <div className="value_label_container">
            <Typography
              level="p"
              text="ESTADO"
              className="label col-2 fw-bold"
            ></Typography>

            <Input
              type="text"
              name="status"
              value={status}
              placeholder="Ingrese el estado"
              className="col-8 fs-2 ms-3 value"
              onChange={(e) => {
                setStatus(e.target.value);
              }}
            />
          </div>
          <Button
            variant="secondary"
            size="lg"
            className="text-black border-dark mt-5 offset-5 col-2"
            onClick={submitProduct}
          >
            Guardar
          </Button>
        </div>
      </div>
    </>
  );
};

export default UpdateProductPage;
