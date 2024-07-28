import React, { useState, useEffect } from "react";
import CreateHeader from "../../components/Headers/CreateHeader";
import labels from "../../config/labels";
import SideBar from "../../components/SideBar/SideBar";
import Axios from "axios";
import Input from "../../common/Input/Input";
import Typography from "../../common/Typography/Typography";
import Button from "react-bootstrap/Button";
import CustomSelect from "../../common/Select/CustomSelect";

const CreateProductPage = () => {
  const [productName, setProductName] = useState("");
  const [supplierId, setSupplierId] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [stock, setStock] = useState("");
  const [purchasePrice, setPurchasePrice] = useState("");
  const [sellingPrice, setSellingPrice] = useState("");
  const [status, setStatus] = useState("");
  const [productsList, setProductsList] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    Axios.get("http://localhost:8080/api/v1/list/suppliers").then(
      (response) => {
        setSuppliers(response.data);
      }
    );
  }, []);

  useEffect(() => {
    Axios.get("http://localhost:8080/api/v1/list/categories").then(
      (response) => {
        setCategories(response.data);
      }
    );
  }, []);

  const validInputs = () => {
    return (
      productName &&
      supplierId &&
      categoryId &&
      stock &&
      purchasePrice &&
      sellingPrice &&
      status
    );
  };

  const submitProduct = () => {
    if (!validInputs()) {
      setError("Todos los campos deben estar llenos para crear el producto.");
      setMessage("");
      setTimeout(() => {
        setError("");
      }, 5000);
      return;
    }

    Axios.post("http://localhost:8080/api/v1/create", {
      productName: productName,
      supplierId: supplierId,
      categoryId: categoryId,
      stock: stock,
      purchasePrice: purchasePrice,
      sellingPrice: sellingPrice,
      status: status,
    })
      .then(() => {
        setProductsList([
          ...productsList,
          {
            productname: productName,
            supplierId: supplierId,
            categoryId: categoryId,
            stock: stock,
            purchasePrice: purchasePrice,
            sellingPrice: sellingPrice,
            status: status,
          },
        ]);

        setProductName("");
        setSupplierId("");
        setCategoryId("");
        setStock("");
        setPurchasePrice("");
        setSellingPrice("");
        setStatus("");
        setMessage("El producto ha sido guardado con éxito.");
        setError("");
        setTimeout(() => {
          setMessage("");
        }, 5000);
      })
      .catch((error) => {
        setMessage("");
        setError("Error en el proceso de creación: " + error.message);
        setTimeout(() => {
          setError("");
        }, 5000);
      });
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

            <CustomSelect
              name="supplier"
              value={supplierId}
              className={`col-8 fs-2 ms-3 value custom_select ${
                supplierId ? "not-default" : ""
              }`}
              onChange={(e) => {
                setSupplierId(e.target.value);
              }}
              options={suppliers.map((supplier) => ({
                value: supplier.supplier_id,
                label: supplier.supplier_name,
              }))}
              placeholder="Seleccione un proveedor"
            />
          </div>
          <div className="value_label_container mb-4">
            <Typography
              level="p"
              text="CATEGORIA"
              className="label col-2 fw-bold"
            ></Typography>

            <CustomSelect
              name="category"
              value={categoryId}
              className={`col-8 fs-2 ms-3 value custom_select ${
                categoryId ? "not-default" : ""
              }`}
              onChange={(e) => {
                setCategoryId(e.target.value);
              }}
              options={categories.map((category) => ({
                value: category.category_id,
                label: category.category_name,
              }))}
              placeholder="Seleccione una categoria"
            />
            {/* <Input
              type="text"
              name="category"
              value={category}
              placeholder="Ingrese el nombre de la categoría"
              className="col-8 fs-2 ms-3 value"
              onChange={(e) => {
                setCategory(e.target.value);
              }}
            /> */}
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
          {message && (
            <Typography
              level="p"
              text={message}
              className="text-primary mt-5 fs-3"
            />
          )}
          {error && (
            <Typography
              level="p"
              text={error}
              className="text-danger mt-5 fs-3"
            />
          )}
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
