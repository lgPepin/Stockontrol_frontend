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
  const [statusId, setStatusId] = useState(supplier.status_id || "");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
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
    Axios.get("http://localhost:8080/api/v1/list/statuses")
      .then((response) => {
        setStatuses(response.data);

        const status = response.data.find(
          (status) => status.status === supplier.status
        );
        if (status) {
          setStatusId(status.status_id);
        }
      })
      .catch((error) => {
        console.error("Error al recuperar los estados :", error);
      });
  }, [supplier.status]);

  // const validInputs = () => {
  //   return (
  //     supplierName &&
  //     identificationNumber &&
  //     address &&
  //     phone &&
  //     contactName &&
  //     orderDay &&
  //     deliveryDay &&
  //     statusId
  //   );
  // };

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
        status_id: statusId,
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
        setStatusId("");
        setMessage("El proveedor ha sido actualizado con éxito.");
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
        text={labels.PAGES.SUPPLIER.UPDATE_SUPPLIER_PAGE}
        pathSearch={"/supplier/search"}
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
              text={labels.SUPPLIERS.SUPPLIER_NAME()}
              className="label col-2 fw-bold"
            ></Typography>

            <Input
              type="text"
              name="supplierName"
              value={supplierName}
              placeholder="Ingrese el nombre del proveedor a actualizar"
              className={`col-8 fs-2 ms-3 value ${
                errors.supplierName ? "error-border" : ""
              }`}
              onChange={(e) => {
                setSupplierName(e.target.value);
                setErrors({ ...errors, supplierName: false });
              }}
            />
          </div>
          <div className="value_label_container mb-4 ">
            <Typography
              level="p"
              text={labels.SUPPLIERS.IDENTIFICATION_NUMBER()}
              className="label col-2 fw-bold"
            ></Typography>

            <Input
              type="text"
              name="identificationNumber"
              value={identificationNumber}
              placeholder="Ingrese el numero de identificación a actualizar"
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
              placeholder="Ingrese la dirección del proveedor a actualizar"
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
              placeholder="Ingrese el teléfono del proveedor a actualizar"
              className={`col-8 fs-2 ms-3 value ${
                errors.phone ? "error-border" : ""
              }`}
              onChange={(e) => {
                setPhone(e.target.value);
                setErrors({ ...errors, phone: false });
              }}
            />
          </div>
          <div className="value_label_container mb-4 ">
            <Typography
              level="p"
              text={labels.SUPPLIERS.CONTACT_NAME()}
              className="label col-2 fw-bold"
            ></Typography>

            <Input
              type="text"
              name="contactName"
              value={contactName}
              placeholder="Ingrese el nombre del contacto a actualizar"
              className={`col-8 fs-2 ms-3 value ${
                errors.contactName ? "error-border" : ""
              }`}
              onChange={(e) => {
                setContactName(e.target.value);
                setErrors({ ...errors, contactName: false });
              }}
            />
          </div>
          <div className="value_label_container mb-4 ">
            <Typography
              level="p"
              text={labels.SUPPLIERS.ORDER_DAY()}
              className="label col-2 fw-bold"
            ></Typography>

            <Input
              type="text"
              name="orderDay"
              value={orderDay}
              placeholder="Ingrese el dia de pedido del proveedor a actualizar"
              className={`col-8 fs-2 ms-3 value ${
                errors.orderDay ? "error-border" : ""
              }`}
              onChange={(e) => {
                setOrderDay(e.target.value);
                setErrors({ ...errors, orderDay: false });
              }}
            />
          </div>
          <div className="value_label_container mb-4 ">
            <Typography
              level="p"
              text={labels.SUPPLIERS.DELIVERY_DAY()}
              className="label col-2 fw-bold"
            ></Typography>

            <Input
              type="text"
              name="deliveryDay"
              value={deliveryDay}
              placeholder="Ingrese el dia de entrega del proveedor a actualizar"
              className={`col-8 fs-2 ms-3 value ${
                errors.deliveryDay ? "error-border" : ""
              }`}
              onChange={(e) => {
                setDeliveryDay(e.target.value);
                setErrors({ ...errors, deliveryDay: false });
              }}
            />
          </div>
          <div className="value_label_container">
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
              options={statuses.map((status) => ({
                value: status.status_id,
                label: status.status,
              }))}
              placeholder="Ingrese el estado del proveedor a crear"
            />

            {/* <Input
              type="text"
              name="status"
              value={status}
              placeholder="Ingrese el estado del proveedor a actualizar"
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
            onClick={submitSupplier}
          >
            Guardar
          </Button>
        </div>
      </div>
    </>
  );
};

export default UpdateSupplierPage;
