import React, { useState, useEffect } from "react";
import CreateHeader from "../../components/Headers/CreateHeader";
import labels from "../../config/labels";
import SideBar from "../../components/SideBar/SideBar";
import Axios from "axios";
import Input from "../../common/Input/Input";
import Typography from "../../common/Typography/Typography";
import Button from "react-bootstrap/Button";
import CustomSelect from "../../common/Select/CustomSelect";

const CreateProductPage = ({ onLogout }) => {
  const [productName, setProductName] = useState("");
  const [supplierId, setSupplierId] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [stock, setStock] = useState("");
  const [purchasePrice, setPurchasePrice] = useState("");
  const [sellingPrice, setSellingPrice] = useState("");
  const [statusId, setStatusId] = useState("");
  const [productsList, setProductsList] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [errors, setErrors] = useState({
    productName: false,
    supplierId: false,
    categoryId: false,
    stock: false,
    purchasePrice: false,
    sellingPrice: false,
    statusId: false,
  });

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

  useEffect(() => {
    Axios.get("http://localhost:8080/api/v1/list/statuses").then((response) => {
      setStatuses(response.data);
    });
  }, []);

  const validInputs = () => {
    const errorsObject = {
      productName: !productName,
      supplierId: !supplierId,
      categoryId: !categoryId,
      stock: !stock,
      purchasePrice: !purchasePrice,
      sellingPrice: !sellingPrice,
      statusId: !statusId,
    };

    setErrors(errorsObject);

    return !Object.values(errorsObject).some((value) => value);
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
      statusId: statusId,
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
            statusId: statusId,
          },
        ]);

        setProductName("");
        setSupplierId("");
        setCategoryId("");
        setStock("");
        setPurchasePrice("");
        setSellingPrice("");
        setStatusId("");
        setMessage("El producto ha sido guardado con éxito.");
        setError("");
        setErrors({});
        setTimeout(() => {
          setMessage("");
        }, 5000);
      })
      .catch((error) => {
        setMessage("");
        if (error.response && error.response.status === 401) {
          setError("No está autorizado para realizar esta acción.");
        } else {
          setError("Ya existe un producto con este nombre");
        }
        setTimeout(() => {
          setError("");
        }, 5000);
      });
  };

  return (
    <>
      <CreateHeader
        text={labels.PAGES.PRODUCT.CREATE_PRODUCT_PAGE}
        pathSearch={"/"}
        backButtonName={labels.BUTTONS.BACK_BUTTON}
      />
      <div className="row align-items-start container_principal">
        <div className="col-2 sideBar_container">
          <SideBar onLogout={onLogout} />
        </div>
        <div className="offset-1 col-9 mt-5 frame">
          <div className="value_label_container mb-4">
            <Typography
              level="p"
              text={labels.PRODUCTS.PRODUCT_NAME()}
              className="label col-2 fw-bold"
            ></Typography>

            <Input
              type="text"
              name="productName"
              value={productName}
              placeholder="Ingrese el nombre del producto a crear"
              className={`col-8 fs-2 ms-3 value ${
                errors.productName ? "error-border" : ""
              }`}
              onChange={(e) => {
                setProductName(e.target.value);
                setErrors({ ...errors, productName: false });
              }}
            />
          </div>
          <div className="value_label_container mb-4 ">
            <Typography
              level="p"
              text={labels.PRODUCTS.SUPPLIER()}
              className="label col-2 fw-bold"
            ></Typography>

            <CustomSelect
              name="supplier"
              value={supplierId}
              className={`col-8 fs-2 ms-3 value custom_select ${
                supplierId ? "not-default" : ""
              } ${errors.supplierId ? "error-border" : ""}`}
              onChange={(e) => {
                setSupplierId(e.target.value);
                setErrors({ ...errors, supplierId: false });
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
              text={labels.PRODUCTS.CATEGORY()}
              className="label col-2 fw-bold"
            ></Typography>

            <CustomSelect
              name="category"
              value={categoryId}
              className={`col-8 fs-2 ms-3 value custom_select ${
                categoryId ? "not-default" : ""
              } ${errors.categoryId ? "error-border" : ""}`}
              onChange={(e) => {
                setCategoryId(e.target.value);
                setErrors({ ...errors, categoryId: false });
              }}
              options={categories.map((category) => ({
                value: category.category_id,
                label: category.category_name,
              }))}
              placeholder="Seleccione una categoria"
            />
          </div>

          <div className="value_label_container mb-4">
            <Typography
              level="p"
              text={labels.PRODUCTS.STOCK()}
              className="label col-2 fw-bold"
            ></Typography>

            <Input
              type="text"
              name="stock"
              value={stock}
              placeholder="Ingrese la cantidad en stock"
              className={`col-8 fs-2 ms-3 value ${
                errors.stock ? "error-border" : ""
              }`}
              onChange={(e) => {
                setStock(e.target.value);
                setErrors({ ...errors, stock: false });
              }}
            />
          </div>
          <div className="value_label_container mb-4 ">
            <Typography
              level="p"
              text={labels.PRODUCTS.PURCHASE_PRICE()}
              className="label col-2 fw-bold"
            ></Typography>

            <Input
              type="text"
              name="purchasePrice"
              value={purchasePrice}
              placeholder="Ingrese el precio de compra"
              className={`col-8 fs-2 ms-3 value ${
                errors.purchasePrice ? "error-border" : ""
              }`}
              onChange={(e) => {
                setPurchasePrice(e.target.value);
                setErrors({ ...errors, purchasePrice: false });
              }}
            />
          </div>
          <div className="value_label_container mb-4 ">
            <Typography
              level="p"
              text={labels.PRODUCTS.SELLING_PRICE()}
              className="label col-2 fw-bold"
            ></Typography>

            <Input
              type="text"
              name="sellingPrice"
              value={sellingPrice}
              placeholder="Ingrese el precio de venta"
              className={`col-8 fs-2 ms-3 value ${
                errors.sellingPrice ? "error-border" : ""
              }`}
              onChange={(e) => {
                setSellingPrice(e.target.value);
                setErrors({ ...errors, sellingPrice: false });
              }}
            />
          </div>
          <div className="value_label_container">
            <Typography
              level="p"
              text={labels.PRODUCTS.STATUS()}
              className="label col-2 fw-bold"
            ></Typography>

            <CustomSelect
              name="status"
              value={statusId}
              className={`col-8 fs-2 ms-3 value custom_select ${
                statusId ? "not-default" : ""
              } ${errors.statusId ? "error-border" : ""}`}
              onChange={(e) => {
                setStatusId(e.target.value);
                setErrors({ ...errors, statusId: false });
              }}
              options={statuses.slice(0, 2).map((status) => ({
                value: status.status_id,
                label: status.status,
              }))}
              placeholder="Seleccione un estado"
            />
          </div>

          {message && (
            <div
              className={"alert fs-3 mt-4 alert-success text-center"}
              role="alert"
            >
              {message}
            </div>
          )}

          {error && (
            <div
              className={"alert fs-3 mt-4 alert-danger text-center"}
              role="alert"
            >
              {error}
            </div>
          )}

          <Button
            variant="secondary"
            size="lg"
            className="text-white border-dark mt-5 offset-5 col-2"
            onClick={submitProduct}
          >
            {labels.BUTTONS.SAVE_BUTTON}
          </Button>
        </div>
      </div>
    </>
  );
};

export default CreateProductPage;
