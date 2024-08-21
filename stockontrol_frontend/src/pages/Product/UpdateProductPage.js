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

  const [productName, setProductName] = useState(product.product_name || "");
  const [supplierId, setSupplierId] = useState(product.product_id || "");
  const [categoryId, setCategoryId] = useState(product.category_id || "");
  const [stock, setStock] = useState(product.stock || "");
  const [purchasePrice, setPurchasePrice] = useState(
    product.purchase_price || ""
  );
  const [sellingPrice, setSellingPrice] = useState(product.selling_price || "");
  const [statusId, setStatusId] = useState(product.status_id || "");
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

  useEffect(() => {
    Axios.get("http://localhost:8080/api/v1/list/categories")
      .then((response) => {
        setCategories(response.data);

        const category = response.data.find(
          (category) => category.category_name === product.category_name
        );
        if (category) {
          setCategoryId(category.category_id);
        }
      })
      .catch((error) => {
        console.error("Error al recuperar las categorias :", error);
      });
  }, [product.category_name]);

  useEffect(() => {
    Axios.get("http://localhost:8080/api/v1/list/statuses")
      .then((response) => {
        setStatuses(response.data);

        const status = response.data.find(
          (status) => status.status === product.status
        );
        if (status) {
          setStatusId(status.status_id);
        }
      })
      .catch((error) => {
        console.error("Error al recuperar los estados :", error);
      });
  }, [product.status]);

  // const validInputs = () => {
  //   return (
  //     productName &&
  //     supplierId &&
  //     categoryId &&
  //     stock &&
  //     purchasePrice &&
  //     sellingPrice &&
  //     statusId
  //   );
  // };

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
      category_id: categoryId,
      stock: stock,
      purchase_price: purchasePrice,
      selling_price: sellingPrice,
      status_id: statusId,
    })
      .then((response) => {
        setProductName("");
        setSupplierId("");
        setCategoryId("");
        setStock("");
        setPurchasePrice("");
        setSellingPrice("");
        setStatusId("");
        setMessage("El producto ha sido actualizado con éxito.");
        setError("");
        setErrors({});
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
        text={labels.PAGES.PRODUCT.UPDATE_PRODUCT_PAGE}
        pathSearch={"/"}
        backButtonName={labels.BUTTONS.BACK_BUTTON}
      />
      <div className="row align-items-start container_principal">
        <div className="col-2 sideBar_container">
          <SideBar />
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
            {/* <Input
              type="text"
              name="category"
              value={categoryId}
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
              options={statuses.map((status) => ({
                value: status.status_id,
                label: status.status,
              }))}
              placeholder="Seleccione un estado"
            />

            {/* <Input
              type="text"
              name="status"
              value={status}
              placeholder="Ingrese el estado"
              className="col-8 fs-2 ms-3 value"
              onChange={(e) => {
                setStatus(e.target.value);
              }}
            /> */}
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
