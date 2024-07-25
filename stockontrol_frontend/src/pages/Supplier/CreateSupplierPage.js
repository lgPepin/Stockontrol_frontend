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
  const [suppliersList, setSuppliersList] = useState([]);
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const submitSupplier = () => {
    if (!supplierName.trim()) {
      setConfirmationMessage(
        "No se puede crear un proveedor sin nombre. Por favor ingresar el nombre del proveedor!"
      );
      setMessageType("danger");
      return;
    }

    Axios.post("http://localhost:8080/api/v1/suppliers/create", {
      supplierName: supplierName,
    })
      .then((response) => {
        setSuppliersList([
          ...suppliersList,
          {
            supplier_name: supplierName,
          },
        ]);
        setSupplierName("");
        setConfirmationMessage("Proveedor creado con éxito!");
        setMessageType("primary");
      })
      .catch((error) => {
        console.error("There was an error creating the supplier!", error);
        setConfirmationMessage("Error al crear el proveedor");
        setMessageType("danger");
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
          <Button
            variant="secondary"
            size="lg"
            className="text-black border-dark mt-5 offset-5 col-2"
            onClick={submitSupplier}
          >
            Guardar
          </Button>
          {confirmationMessage && (
            <div className={`mt-3 fs-3 text-${messageType}`}>
              <Typography level="p" text={confirmationMessage} />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CreateSupplierPage;
