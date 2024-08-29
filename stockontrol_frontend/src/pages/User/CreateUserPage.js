import React, { useState, useEffect } from "react";
import CreateHeader from "../../components/Headers/CreateHeader";
import labels from "../../config/labels";
import SideBar from "../../components/SideBar/SideBar";
import Axios from "axios";
import Input from "../../common/Input/Input";
import Typography from "../../common/Typography/Typography";
import Button from "react-bootstrap/Button";
import CustomSelect from "../../common/Select/CustomSelect";

const CreateUserPage = ({ onLogout }) => {
  const [userName, setUserName] = useState("");
  const [userLastName, setUserLastName] = useState("");
  const [userFirstName, setUserFirstName] = useState("");
  const [roleId, setRoleId] = useState("");
  const [statusId, setStatusId] = useState("");
  const [password, setPassword] = useState("");
  const [usersList, setUsersList] = useState([]);
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [statuses, setStatuses] = useState([]);
  const [roles, setRoles] = useState([]);
  const [errors, setErrors] = useState({
    userName: false,
    userLastName: false,
    userFirstName: false,
    roleId: false,
    statusId: false,
    password: false,
  });

  useEffect(() => {
    Axios.get("http://localhost:8080/api/v1/list/statuses").then((response) => {
      setStatuses(response.data);
    });
  }, []);

  useEffect(() => {
    Axios.get("http://localhost:8080/api/v1/list/roles").then((response) => {
      setRoles(response.data);
    });
  }, []);

  const validInputs = () => {
    const errorsObject = {
      userName: !userName,
      userLastName: !userLastName,
      userFirstName: !userFirstName,
      roleId: !roleId,
      statusId: !statusId,
      password: !password,
    };

    setErrors(errorsObject);

    return !Object.values(errorsObject).some((value) => value);
  };

  const submitUser = () => {
    if (!validInputs()) {
      setConfirmationMessage(
        "Todos los campos deben estar llenos para crear el producto."
      );
      setMessageType("danger");
      setTimeout(() => {
        setConfirmationMessage("");
      }, 5000);
      return;
    }

    Axios.post("http://localhost:8080/api/v1/users/create", {
      userName: userName,
      userLastName: userLastName,
      userFirstName: userFirstName,
      roleId: roleId,
      statusId: statusId,
      password: password,
    })
      .then((response) => {
        setUsersList([
          ...usersList,
          {
            username: userName,
            user_lastname: userLastName,
            user_firstname: userFirstName,
            roleId: roleId,
            statusId: statusId,
            password: password,
          },
        ]);
        setUserName("");
        setUserLastName("");
        setUserFirstName("");
        setRoleId("");
        setStatusId("");
        setPassword("");
        setErrors({});
        setConfirmationMessage("Usuario creado con éxito!");
        setMessageType("primary");
        setTimeout(() => {
          setConfirmationMessage("");
        }, 5000);
        return;
      })
      .catch((error) => {
        console.error("Error al crear el usuario!", error);
        setConfirmationMessage("Ya existe un usuario con ese nombre");
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
        text={labels.PAGES.USER.CREATE_USER_PAGE}
        pathSearch={"/user/search"}
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
              text={labels.USERS.USER_NAME()}
              className="label col-2 fw-bold"
            ></Typography>

            <Input
              type="text"
              name="userName"
              value={userName}
              placeholder="Ingrese el nombre del usuario a crear"
              className={`col-8 fs-2 ms-3 value ${
                errors.userName ? "error-border" : ""
              }`}
              onChange={(e) => {
                setUserName(e.target.value);
              }}
            />
          </div>
          <div className="value_label_container mb-4">
            <Typography
              level="p"
              text={labels.USERS.USER_LASTNAME()}
              className="label col-2 fw-bold"
            ></Typography>

            <Input
              type="text"
              name="userLastName"
              value={userLastName}
              placeholder="Ingrese el apellido del usuario a crear"
              className={`col-8 fs-2 ms-3 value ${
                errors.userLastName ? "error-border" : ""
              }`}
              onChange={(e) => {
                setUserLastName(e.target.value);
              }}
            />
          </div>
          <div className="value_label_container mb-4">
            <Typography
              level="p"
              text={labels.USERS.USER_FIRSTNAME()}
              className="label col-2 fw-bold"
            ></Typography>

            <Input
              type="text"
              name="userFirstName"
              value={userFirstName}
              placeholder="Ingrese el nombre del usuario a crear"
              className={`col-8 fs-2 ms-3 value ${
                errors.userFirstName ? "error-border" : ""
              }`}
              onChange={(e) => {
                setUserFirstName(e.target.value);
                setErrors({ ...errors, userFirstName: false });
              }}
            />
          </div>
          <div className="value_label_container mb-4">
            <Typography
              level="p"
              text={labels.USERS.ROLE()}
              className="label col-2 fw-bold"
            ></Typography>

            <CustomSelect
              name="role"
              value={roleId}
              className={`col-8 fs-2 ms-3 value custom_select ${
                roleId ? "not-default" : ""
              } ${errors.roleId ? "error-border" : ""}`}
              onChange={(e) => {
                setRoleId(e.target.value);
                setErrors({ ...errors, roleId: false });
              }}
              options={roles.map((role) => ({
                value: role.role_id,
                label: role.role,
              }))}
              placeholder="Seleccione un rol"
            />
          </div>
          <div className="value_label_container mb-4">
            <Typography
              level="p"
              text={labels.USERS.STATUS()}
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
          <div className="value_label_container mb-4">
            <Typography
              level="p"
              text={labels.USERS.PASSWORD()}
              className="label col-2 fw-bold"
            ></Typography>

            <Input
              type="text"
              name="password"
              value={password}
              placeholder="Ingrese el password del usuario a crear"
              className={`col-8 fs-2 ms-3 value ${
                errors.password ? "error-border" : ""
              }`}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
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
            onClick={submitUser}
          >
            {labels.BUTTONS.SAVE_BUTTON}
          </Button>
        </div>
      </div>
    </>
  );
};

export default CreateUserPage;
