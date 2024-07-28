import React, { useState } from "react";
import CreateHeader from "../../components/Headers/CreateHeader";
import labels from "../../config/labels";
import SideBar from "../../components/SideBar/SideBar";
import Axios from "axios";
import Input from "../../common/Input/Input";
import Typography from "../../common/Typography/Typography";
import Button from "react-bootstrap/Button";

const CreateUserPage = () => {
  const [userLastName, setUserLastName] = useState("");
  const [userFirstName, setUserFirstName] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("");
  const [usersList, setUsersList] = useState([]);
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const validInputs = () => {
    return userLastName && userFirstName && role && status;
  };

  const submitUser = () => {
    if (!validInputs()) {
      setConfirmationMessage(
        "Todos los campos deben estar llenos para crear el producto."
      );
      setMessageType("danger");
      return;
    }

    // ---------------------------------------
    console.log("Submitting user:", {
      userLastName,
      userFirstName,
      role,
      status,
    });
    //--------------------------------------------

    Axios.post("http://localhost:8080/api/v1/users/create", {
      userLastName: userLastName,
      userFirstName: userFirstName,
      role: role,
      status: status,
    })
      .then((response) => {
        setUsersList([
          ...usersList,
          {
            user_lastname: userLastName,
            user_firstname: userFirstName,
            role: role,
            status: status,
          },
        ]);
        setUserLastName("");
        setUserFirstName("");
        setRole("");
        setStatus("");
        setConfirmationMessage("Usuario creado con éxito!");
        setMessageType("primary");
        setTimeout(() => {
          setConfirmationMessage("");
        }, 5000);
        return;
      })
      .catch((error) => {
        console.error("Error al crear el usuario!", error);
        setConfirmationMessage("Error al crear el usuario");
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
        text={labels.USER.CREATE_USER_PAGE}
        pathSearch={"/user/search"}
      />
      <div className="row align-items-start container_principal">
        <div className="col-2 sideBar_container">
          <SideBar />
        </div>
        <div className="offset-1 col-9 mt-5 frame">
          <div className="value_label_container mb-4">
            <Typography
              level="p"
              text="APELLIDO"
              className="label col-2 fw-bold"
            ></Typography>

            <Input
              type="text"
              name="userLastName"
              value={userLastName}
              placeholder="Ingrese el apellido del usuario a crear"
              className="col-8 fs-2 ms-3 value"
              onChange={(e) => {
                setUserLastName(e.target.value);
              }}
            />
          </div>
          <div className="value_label_container mb-4">
            <Typography
              level="p"
              text="NOMBRE"
              className="label col-2 fw-bold"
            ></Typography>

            <Input
              type="text"
              name="userFirstName"
              value={userFirstName}
              placeholder="Ingrese el nombre del usuario a crear"
              className="col-8 fs-2 ms-3 value"
              onChange={(e) => {
                setUserFirstName(e.target.value);
              }}
            />
          </div>
          <div className="value_label_container mb-4">
            <Typography
              level="p"
              text="ROL"
              className="label col-2 fw-bold"
            ></Typography>

            <Input
              type="text"
              name="role"
              value={role}
              placeholder="Ingrese el rol del usuario a crear"
              className="col-8 fs-2 ms-3 value"
              onChange={(e) => {
                setRole(e.target.value);
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
              placeholder="Ingrese el estado del usuario a crear"
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
            onClick={submitUser}
          >
            Guardar
          </Button>
        </div>
      </div>
    </>
  );
};

export default CreateUserPage;
