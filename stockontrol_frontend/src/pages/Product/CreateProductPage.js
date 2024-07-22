import React, { useState } from "react";
import CreateHeader from "../../components/Headers/CreateHeader";
import labels from "../../config/labels";
import SideBar from "../../components/SideBar/SideBar";
import Axios from "axios";
import Input from "../../common/Input/Input";
import Typography from "../../common/Typography/Typography";
import Button from "react-bootstrap/Button";

const CreateProductPage = () => {
  const [productName, setProductName] = useState("");
  const [supplier, setSupplier] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState();
  const [purchasePrice, setPurchasePrice] = useState();
  const [sellingPrice, setSellingPrice] = useState();
  const [status, setStatus] = useState("");
  const [productsList, setProductsList] = useState([]);

  const submitProduct = () => {
    Axios.post("http://localhost:8080/api/insert", {
      productName: productName,
      supplier: supplier,
      category: category,
      stock: stock,
      purchasePrice: purchasePrice,
      sellingPrice: sellingPrice,
      status: status,
    });

    setProductsList([
      ...productsList,
      {
        productname: productName,
        supplier: supplier,
        category: category,
        stock: stock,
        purchasePrice: purchasePrice,
        sellingPrice: sellingPrice,
        status: status,
      },
    ]);

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
      <CreateHeader
        text={labels.PRODUCT.CREATE_PRODUCT_PAGE}
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

export default CreateProductPage;
