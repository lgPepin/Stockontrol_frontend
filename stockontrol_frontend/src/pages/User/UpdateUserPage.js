import React, { useState } from "react";
import UpdateHeader from "../../components/Headers/UpdateHeader";
import labels from "../../config/labels";
import SideBar from "../../components/SideBar/SideBar";
import Axios from "axios";
import Input from "../../common/Input/Input";
import Typography from "../../common/Typography/Typography";
import Button from "react-bootstrap/Button";
import { useLocation } from "react-router-dom";

const UpdateUserPage = () => {
  const location = useLocation();
  const user = location.state?.user || {};

  const [userLastName, setUserLastName] = useState(user.user_lastname || "");
  const [userFirstName, setUserFirstName] = useState(user.user_firstname || "");
  const [role, setRole] = useState(user.role || "");
  const [status, setStatus] = useState(user.status || "");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const validInputs = () => {
    return userLastName && userFirstName && role && status;
  };

  const submitUser = () => {
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

    Axios.put(`http://localhost:8080/api/v1/users/update/${user.user_id}`, {
      user_lastname: userLastName,
      user_firstname: userFirstName,
      role: role,
      status: status,
    })
      .then((response) => {
        setUserLastName("");
        setUserFirstName("");
        setRole("");
        setStatus("");
        setMessage("El usuario ha sido actualizado con éxito.");
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
        text={labels.USER.UPDATE_SUPPLIER_PAGE}
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
              placeholder="Ingrese el apellido del usuario a actualizar"
              className="col-8 fs-2 ms-3 value"
              onChange={(e) => {
                setUserLastName(e.target.value);
              }}
            />
          </div>
          <div className="value_label_container mb-4 ">
            <Typography
              level="p"
              text="NOMBRE"
              className="label col-2 fw-bold"
            ></Typography>

            <Input
              type="text"
              name="userFirstName"
              value={userFirstName}
              placeholder="Ingrese el nombre del usuario a actualizar"
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
              placeholder="Ingrese el rol del usuario a actualizar"
              className="col-8 fs-2 ms-3 value"
              onChange={(e) => {
                setRole(e.target.value);
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
              placeholder="Ingrese el estado del usuario a actualizar"
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
            onClick={submitUser}
          >
            Guardar
          </Button>
        </div>
      </div>
    </>
  );
};

export default UpdateUserPage;
