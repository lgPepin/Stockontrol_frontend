import React, { useState } from "react";
import CreateHeader from "../../components/Headers/CreateHeader";
import labels from "../../config/labels";
import SideBar from "../../components/SideBar/SideBar";
import Axios from "axios";
import Input from "../../common/Input/Input";
import Typography from "../../common/Typography/Typography";
import Button from "react-bootstrap/Button";

const CreateSupplierPage = () => {
  const [supplierName, setSupplierName] = useState("");
  const [identificationNumber, setIdentificationNumber] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [contactName, setContactName] = useState("");
  const [orderDay, setOrderDay] = useState("");
  const [deliveryDay, setDeliveryDay] = useState("");
  const [status, setStatus] = useState("");
  const [suppliersList, setSuppliersList] = useState([]);
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const [messageType, setMessageType] = useState("");

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

  const submitSupplier = () => {
    if (!validInputs()) {
      setConfirmationMessage(
        "Todos los campos deben estar llenos para crear el producto."
      );
      setMessageType("danger");
      return;
    }

    Axios.post("http://localhost:8080/api/v1/suppliers/create", {
      supplierName: supplierName,
      identificationNumber: identificationNumber,
      address: address,
      phone: phone,
      contactName: contactName,
      orderDay: orderDay,
      deliveryDay: deliveryDay,
      status: status,
    })
      .then((response) => {
        setSuppliersList([
          ...suppliersList,
          {
            supplier_name: supplierName,
            identificationNumber: identificationNumber,
            address: address,
            phone: phone,
            contactName: contactName,
            orderDay: orderDay,
            deliveryDay: deliveryDay,
            status: status,
          },
        ]);
        setSupplierName("");
        setIdentificationNumber("");
        setAddress("");
        setPhone("");
        setContactName("");
        setOrderDay("");
        setDeliveryDay("");
        setStatus("");
        setConfirmationMessage("Proveedor creado con éxito!");
        setMessageType("primary");
        setTimeout(() => {
          setConfirmationMessage("");
        }, 5000);
        return;
      })
      .catch((error) => {
        console.error("There was an error creating the supplier!", error);
        setConfirmationMessage("Error al crear el proveedor");
        setMessageType("danger");
        setTimeout(() => {
          setConfirmationMessage("");
        }, 5000);
        return;
      });
  };

  return (
    <>
      <CreateHeader
        text={labels.SUPPLIER.CREATE_SUPPLIER_PAGE}
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
              placeholder="Ingrese el nombre del proveedor a crear"
              className="col-8 fs-2 ms-3 value"
              onChange={(e) => {
                setSupplierName(e.target.value);
              }}
            />
          </div>
          <div className="value_label_container mb-4">
            <Typography
              level="p"
              text="IDENTIFICACION"
              className="label col-2 fw-bold"
            ></Typography>

            <Input
              type="text"
              name="identificacionNumber"
              value={identificationNumber}
              placeholder="Ingrese el numero de identificación del proveedor"
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
              placeholder="Ingrese la dirección del proveedor a crear"
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
              placeholder="Ingrese el teléfono del proveedor a crear"
              className="col-8 fs-2 ms-3 value"
              onChange={(e) => {
                setPhone(e.target.value);
              }}
            />
          </div>
          <div className="value_label_container mb-4">
            <Typography
              level="p"
              text="NOMBRE CONTACTO"
              className="label col-2 fw-bold"
            ></Typography>

            <Input
              type="text"
              name="contactName"
              value={contactName}
              placeholder="Ingrese el nombre del contacto del proveedor"
              className="col-8 fs-2 ms-3 value"
              onChange={(e) => {
                setContactName(e.target.value);
              }}
            />
          </div>
          <div className="value_label_container mb-4">
            <Typography
              level="p"
              text="DIA DE PEDIDO"
              className="label col-2 fw-bold"
            ></Typography>

            <Input
              type="text"
              name="orderDay"
              value={orderDay}
              placeholder="Ingrese el dia de pedido del proveedor a crear"
              className="col-8 fs-2 ms-3 value"
              onChange={(e) => {
                setOrderDay(e.target.value);
              }}
            />
          </div>
          <div className="value_label_container mb-4">
            <Typography
              level="p"
              text="DIA DE ENTREGA"
              className="label col-2 fw-bold"
            ></Typography>

            <Input
              type="text"
              name="deliveryDay"
              value={deliveryDay}
              placeholder="Ingrese el dia de entrega del proveedor a crear"
              className="col-8 fs-2 ms-3 value"
              onChange={(e) => {
                setDeliveryDay(e.target.value);
              }}
            />
          </div>
          <div className="value_label_container mb-4">
            <Typography
              level="p"
              text="ESTATDO"
              className="label col-2 fw-bold"
            ></Typography>

            <Input
              type="text"
              name="status"
              value={status}
              placeholder="Ingrese el estado del proveedor a crear"
              className="col-8 fs-2 ms-3 value"
              onChange={(e) => {
                setStatus(e.target.value);
              }}
            />
          </div>
          {confirmationMessage && (
            <div className={`mt-3 fs-3 text-${messageType}`}>
              <Typography level="p" text={confirmationMessage} />
            </div>
          )}
          <Button
            variant="secondary"
            size="lg"
            className="text-black border-dark mt-5 offset-5 col-2"
            onClick={submitSupplier}
          >
            Guardar
          </Button>
        </div>
      </div>
    </>
  );
};

export default CreateSupplierPage;
