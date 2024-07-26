import React, { useState, useEffect } from "react";
import UpdateHeader from "../../components/Headers/UpdateHeader";
import labels from "../../config/labels";
import SideBar from "../../components/SideBar/SideBar";
import Axios from "axios";
import Input from "../../common/Input/Input";
import Typography from "../../common/Typography/Typography";
import Button from "react-bootstrap/Button";
import { useLocation } from "react-router-dom";
import CustomSelect from "../../common/Select/CustomSelect";

const UpdateProductPage = () => {
  const location = useLocation();
  const product = location.state?.product || {};

  console.log("ID du produit dans UpdateProductPage :", product);

  const [productName, setProductName] = useState(product.product_name || "");
  const [supplierId, setSupplierId] = useState(product.product_id || "");
  const [category, setCategory] = useState(product.category || "");
  const [stock, setStock] = useState(product.stock || "");
  const [purchasePrice, setPurchasePrice] = useState(
    product.purchase_price || ""
  );
  const [sellingPrice, setSellingPrice] = useState(product.selling_price || "");
  const [status, setStatus] = useState(product.status || "");
  const [suppliers, setSuppliers] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    Axios.get("http://localhost:8080/api/v1/list/suppliers")
      .then((response) => {
        setSuppliers(response.data);

        const supplier = response.data.find(
          (supplier) => supplier.supplier_name === product.supplier_name
        );
        if (supplier) {
          setSupplierId(supplier.supplier_id);
        }
      })
      .catch((error) => {
        console.error("Error al recuperar los proveedores :", error);
      });
  }, [product.supplier_name]);

  const validInputs = () => {
    return (
      productName &&
      supplierId &&
      category &&
      stock &&
      purchasePrice &&
      sellingPrice &&
      status
    );
  };

  const submitProduct = () => {
    if (!validInputs()) {
      setError(
        "Todos los campos deben estar llenos para actualizar el producto."
      );
      setMessage("");
      setTimeout(() => {
        setError("");
      }, 5000);
      return;
    }

    Axios.put(`http://localhost:8080/api/v1/update/${product.product_id}`, {
      product_name: productName,
      supplier_id: supplierId,
      category: category,
      stock: stock,
      purchase_price: purchasePrice,
      selling_price: sellingPrice,
      status: status,
    })
      .then((response) => {
        setProductName("");
        setSupplierId("");
        setCategory("");
        setStock("");
        setPurchasePrice("");
        setSellingPrice("");
        setStatus("");
        setMessage("El producto ha sido actualizado con éxito.");
        setError("");
        setTimeout(() => {
          setMessage("");
        }, 5000);
      })
      .catch((error) => {
        setMessage("");
        setError("Error en el proceso de actualización: " + error.message);
        setTimeout(() => {
          setError("");
        }, 5000);
      });
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

export default UpdateProductPage;
