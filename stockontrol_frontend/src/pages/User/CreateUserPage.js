import React, { useState, useEffect } from "react";
import CreateHeader from "../../components/Headers/CreateHeader";
import labels from "../../config/labels";
import SideBar from "../../components/SideBar/SideBar";
import Axios from "axios";
import Input from "../../common/Input/Input";
import Typography from "../../common/Typography/Typography";
import Button from "react-bootstrap/Button";
import CustomSelect from "../../common/Select/CustomSelect";

const CreateUserPage = () => {
  const [userLastName, setUserLastName] = useState("");
  const [userFirstName, setUserFirstName] = useState("");
  const [roleId, setRoleId] = useState("");
  const [statusId, setStatusId] = useState("");
  const [usersList, setUsersList] = useState([]);
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [statuses, setStatuses] = useState([]);
  const [roles, setRoles] = useState([]);
  const [errors, setErrors] = useState({
    userLastName: false,
    userFirstName: false,
    roleId: false,
    statusId: false,
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

  // const validInputs = () => {
  //   return userLastName && userFirstName && role && statusId;
  // };

  const validInputs = () => {
    const errorsObject = {
      userLastName: !userLastName,
      userFirstName: !userFirstName,
      roleId: !roleId,
      statusId: !statusId,
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
      return;
    }

    // ---------------------------------------
    console.log("Submitting user:", {
      userLastName,
      userFirstName,
      roleId,
      statusId,
    });
    //--------------------------------------------

    Axios.post("http://localhost:8080/api/v1/users/create", {
      userLastName: userLastName,
      userFirstName: userFirstName,
      roleId: roleId,
      statusId: statusId,
    })
      .then((response) => {
        setUsersList([
          ...usersList,
          {
            user_lastname: userLastName,
            user_firstname: userFirstName,
            roleId: roleId,
            statusId: statusId,
          },
        ]);
        setUserLastName("");
        setUserFirstName("");
        setRoleId("");
        setStatusId("");
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
        text={labels.PAGES.USER.CREATE_USER_PAGE}
        pathSearch={"/user/search"}
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

            {/* <Input
              type="text"
              name="role"
              value={role}
              placeholder="Ingrese el rol del usuario a crear"
              className={`col-8 fs-2 ms-3 value ${
                errors.role ? "error-border" : ""
              }`}
              onChange={(e) => {
                setRole(e.target.value);
                setErrors({ ...errors, role: false });
              }}
            /> */}
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
              placeholder="Ingrese el estado del usuario a crear"
              className="col-8 fs-2 ms-3 value"
              onChange={(e) => {
                setStatus(e.target.value);
              }}
            /> */}
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
