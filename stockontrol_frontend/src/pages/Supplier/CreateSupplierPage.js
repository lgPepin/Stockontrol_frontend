import React, { useState, useEffect } from "react";
import CreateHeader from "../../components/Headers/CreateHeader";
import labels from "../../config/labels";
import SideBar from "../../components/SideBar/SideBar";
import Axios from "axios";
import Input from "../../common/Input/Input";
import Typography from "../../common/Typography/Typography";
import Button from "react-bootstrap/Button";
import CustomSelect from "../../common/Select/CustomSelect";

const CreateSupplierPage = ({ onLogout }) => {
  const [supplierName, setSupplierName] = useState("");
  const [identificationNumber, setIdentificationNumber] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [contactName, setContactName] = useState("");
  const [orderDay, setOrderDay] = useState("");
  const [deliveryDay, setDeliveryDay] = useState("");
  const [statusId, setStatusId] = useState("");
  const [suppliersList, setSuppliersList] = useState([]);
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [statuses, setStatuses] = useState([]);
  const [errors, setErrors] = useState({
    supplierName: false,
    identificationNumber: false,
    address: false,
    phone: false,
    contactName: false,
    orderDay: false,
    deliveryDay: false,
    statusId: false,
  });

  useEffect(() => {
    Axios.get("http://localhost:8080/api/v1/list/statuses").then((response) => {
      setStatuses(response.data);
    });
  }, []);

  const validInputs = () => {
    const errorsObject = {
      supplierName: !supplierName,
      identificationNumber: !identificationNumber,
      address: !address,
      phone: !phone,
      contactName: !contactName,
      orderDay: !orderDay,
      deliveryDay: !deliveryDay,
      statusId: !statusId,
    };

    setErrors(errorsObject);

    return !Object.values(errorsObject).some((value) => value);
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
      statusId: statusId,
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
            statusId: statusId,
          },
        ]);
        setSupplierName("");
        setIdentificationNumber("");
        setAddress("");
        setPhone("");
        setContactName("");
        setOrderDay("");
        setDeliveryDay("");
        setStatusId("");
        setErrors({});
        setConfirmationMessage("Proveedor creado con éxito!");
        setMessageType("primary");
        setTimeout(() => {
          setConfirmationMessage("");
        }, 5000);
        return;
      })
      .catch((error) => {
        console.error("Error al crear el proveedor!", error);
        setConfirmationMessage("Ya existe un proveedor con este nombre");
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
        text={labels.PAGES.SUPPLIER.CREATE_SUPPLIER_PAGE}
        pathSearch={"/supplier/search"}
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
              text={labels.SUPPLIERS.SUPPLIER_NAME()}
              className="label col-2 fw-bold"
            ></Typography>

            <Input
              type="text"
              name="supplierName"
              value={supplierName}
              placeholder="Ingrese el nombre del proveedor a crear"
              className={`col-8 fs-2 ms-3 value ${
                errors.supplierName ? "error-border" : ""
              }`}
              onChange={(e) => {
                setSupplierName(e.target.value);
                setErrors({ ...errors, supplierName: false });
              }}
            />
          </div>
          <div className="value_label_container mb-4">
            <Typography
              level="p"
              text={labels.SUPPLIERS.IDENTIFICATION_NUMBER()}
              className="label col-2 fw-bold"
            ></Typography>

            <Input
              type="text"
              name="identificacionNumber"
              value={identificationNumber}
              placeholder="Ingrese el numero de identificación del proveedor"
              className={`col-8 fs-2 ms-3 value ${
                errors.identificationNumber ? "error-border" : ""
              }`}
              onChange={(e) => {
                setIdentificationNumber(e.target.value);
                setErrors({ ...errors, identificationNumber: false });
              }}
            />
          </div>
          <div className="value_label_container mb-4">
            <Typography
              level="p"
              text={labels.SUPPLIERS.ADDRESS()}
              className="label col-2 fw-bold"
            ></Typography>

            <Input
              type="text"
              name="address"
              value={address}
              placeholder="Ingrese la dirección del proveedor a crear"
              className={`col-8 fs-2 ms-3 value ${
                errors.address ? "error-border" : ""
              }`}
              onChange={(e) => {
                setAddress(e.target.value);
                setErrors({ ...errors, address: false });
              }}
            />
          </div>
          <div className="value_label_container mb-4">
            <Typography
              level="p"
              text={labels.SUPPLIERS.PHONE()}
              className="label col-2 fw-bold"
            ></Typography>

            <Input
              type="text"
              name="phone"
              value={phone}
              placeholder="Ingrese el teléfono del proveedor a crear"
              className={`col-8 fs-2 ms-3 value ${
                errors.phone ? "error-border" : ""
              }`}
              onChange={(e) => {
                setPhone(e.target.value);
                setErrors({ ...errors, phone: false });
              }}
            />
          </div>
          <div className="value_label_container mb-4">
            <Typography
              level="p"
              text={labels.SUPPLIERS.CONTACT_NAME()}
              className="label col-2 fw-bold"
            ></Typography>

            <Input
              type="text"
              name="contactName"
              value={contactName}
              placeholder="Ingrese el nombre del contacto del proveedor"
              className={`col-8 fs-2 ms-3 value ${
                errors.contactName ? "error-border" : ""
              }`}
              onChange={(e) => {
                setContactName(e.target.value);
                setErrors({ ...errors, contactName: false });
              }}
            />
          </div>
          <div className="value_label_container mb-4">
            <Typography
              level="p"
              text={labels.SUPPLIERS.ORDER_DAY()}
              className="label col-2 fw-bold"
            ></Typography>

            <Input
              type="text"
              name="orderDay"
              value={orderDay}
              placeholder="Ingrese el dia de pedido del proveedor a crear"
              className={`col-8 fs-2 ms-3 value ${
                errors.orderDay ? "error-border" : ""
              }`}
              onChange={(e) => {
                setOrderDay(e.target.value);
                setErrors({ ...errors, orderDay: false });
              }}
            />
          </div>
          <div className="value_label_container mb-4">
            <Typography
              level="p"
              text={labels.SUPPLIERS.DELIVERY_DAY()}
              className="label col-2 fw-bold"
            ></Typography>

            <Input
              type="text"
              name="deliveryDay"
              value={deliveryDay}
              placeholder="Ingrese el dia de entrega del proveedor a crear"
              className={`col-8 fs-2 ms-3 value ${
                errors.deliveryDay ? "error-border" : ""
              }`}
              onChange={(e) => {
                setDeliveryDay(e.target.value);
                setErrors({ ...errors, deliveryDay: false });
              }}
            />
          </div>
          <div className="value_label_container mb-4">
            <Typography
              level="p"
              text={labels.SUPPLIERS.STATUS()}
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
              placeholder="Ingrese el estado del proveedor a crear"
            />
          </div>

          {confirmationMessage && (
            <div
              className={`alert fs-3 mt-4 text-center ${
                messageType === "danger" ? "alert-danger" : "alert-success"
              }`}
              role="alert"
            >
              {confirmationMessage}
            </div>
          )}

          <Button
            variant="secondary"
            size="lg"
            className="text-white border-dark mt-5 offset-5 col-2"
            onClick={submitSupplier}
          >
            {labels.BUTTONS.SAVE_BUTTON}
          </Button>
        </div>
      </div>
    </>
  );
};

export default CreateSupplierPage;
