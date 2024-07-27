import React, { useState } from "react";
import UpdateHeader from "../../components/Headers/UpdateHeader";
import labels from "../../config/labels";
import SideBar from "../../components/SideBar/SideBar";
import Axios from "axios";
import Input from "../../common/Input/Input";
import Typography from "../../common/Typography/Typography";
import Button from "react-bootstrap/Button";
import { useLocation } from "react-router-dom";

const UpdateSupplierPage = () => {
  const location = useLocation();
  const supplier = location.state?.supplier || {};

  const [supplierName, setSupplierName] = useState(
    supplier.supplier_name || ""
  );
  const [identificationNumber, setIdentificationNumber] = useState(
    supplier.identification_number || ""
  );
  const [address, setAddress] = useState(supplier.address || "");
  const [phone, setPhone] = useState(supplier.phone || "");
  const [contactName, setContactName] = useState(supplier.contact_name || "");
  const [orderDay, setOrderDay] = useState(supplier.order_day || "");
  const [deliveryDay, setDeliveryDay] = useState(supplier.delivery_day || "");
  const [status, setStatus] = useState(supplier.status || "");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const validInputs = () => {
    return (
      supplierName &&
      identificationNumber &&
      address &&
      phone &&
      contactName &&
      orderDay &&
      deliveryDay &&
      status
    );
  };

  const submitProduct = () => {
    if (!validInputs()) {
      setError(
        "Todos los campos deben estar llenos para actualizar el proveedor."
      );
      setMessage("");
      setTimeout(() => {
        setError("");
      }, 5000);
      return;
    }

    Axios.put(
      `http://localhost:8080/api/v1/suppliers/update/${supplier.supplier_id}`,
      {
        supplier_name: supplierName,
        identification_number: identificationNumber,
        address: address,
        phone: phone,
        contact_name: contactName,
        order_day: orderDay,
        delivery_day: deliveryDay,
        status: status,
      }
    )
      .then((response) => {
        setSupplierName("");
        setIdentificationNumber("");
        setAddress("");
        setPhone("");
        setContactName("");
        setOrderDay("");
        setDeliveryDay("");
        setStatus("");
        setMessage("El proveedor ha sido actualizado con éxito.");
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
        text={labels.SUPPLIER.UPDATE_SUPPLIER_PAGE}
        pathSearch={"/supplier/search"}
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
              name="supplierName"
              value={supplierName}
              placeholder="Ingrese el nombre del proveedor a actualizar"
              className="col-8 fs-2 ms-3 value"
              onChange={(e) => {
                setSupplierName(e.target.value);
              }}
            />
          </div>
          <div className="value_label_container mb-4 ">
            <Typography
              level="p"
              text="IDENTIFICACION"
              className="label col-2 fw-bold"
            ></Typography>

            <Input
              type="text"
              name="identificationNumber"
              value={identificationNumber}
              placeholder="Ingrese el numero de identificación a actualizar"
              className="col-8 fs-2 ms-3 value"
              onChange={(e) => {
                setIdentificationNumber(e.target.value);
              }}
            />
          </div>
          <div className="value_label_container mb-4">
            <Typography
              level="p"
              text="DIRECCION"
              className="label col-2 fw-bold"
            ></Typography>

            <Input
              type="text"
              name="address"
              value={address}
              placeholder="Ingrese la dirección del proveedor a actualizar"
              className="col-8 fs-2 ms-3 value"
              onChange={(e) => {
                setAddress(e.target.value);
              }}
            />
          </div>
          <div className="value_label_container mb-4">
            <Typography
              level="p"
              text="TELEFONO"
              className="label col-2 fw-bold"
            ></Typography>

            <Input
              type="text"
              name="phone"
              value={phone}
              placeholder="Ingrese el teléfono del proveedor a actualizar"
              className="col-8 fs-2 ms-3 value"
              onChange={(e) => {
                setPhone(e.target.value);
              }}
            />
          </div>
          <div className="value_label_container mb-4 ">
            <Typography
              level="p"
              text="NOMBRE CONTACTO"
              className="label col-2 fw-bold"
            ></Typography>

            <Input
              type="text"
              name="contactName"
              value={contactName}
              placeholder="Ingrese el nombre del contacto a actualizar"
              className="col-8 fs-2 ms-3 value"
              onChange={(e) => {
                setContactName(e.target.value);
              }}
            />
          </div>
          <div className="value_label_container mb-4 ">
            <Typography
              level="p"
              text="DIA DE PEDIDO"
              className="label col-2 fw-bold"
            ></Typography>

            <Input
              type="text"
              name="orderDay"
              value={orderDay}
              placeholder="Ingrese el dia de pedido del proveedor a actualizar"
              className="col-8 fs-2 ms-3 value"
              onChange={(e) => {
                setOrderDay(e.target.value);
              }}
            />
          </div>
          <div className="value_label_container mb-4 ">
            <Typography
              level="p"
              text="DIA DE ENTREGA"
              className="label col-2 fw-bold"
            ></Typography>

            <Input
              type="text"
              name="deliveryDay"
              value={deliveryDay}
              placeholder="Ingrese el dia de entrega del proveedor a actualizar"
              className="col-8 fs-2 ms-3 value"
              onChange={(e) => {
                setDeliveryDay(e.target.value);
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
              placeholder="Ingrese el estado del proveedor a actualizar"
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

export default UpdateSupplierPage;
