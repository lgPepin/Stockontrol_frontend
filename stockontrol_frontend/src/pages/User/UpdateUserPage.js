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

const UpdateUserPage = () => {
  const location = useLocation();
  const user = location.state?.user || {};

  const [userLastName, setUserLastName] = useState(user.user_lastname || "");
  const [userFirstName, setUserFirstName] = useState(user.user_firstname || "");
  const [roleId, setRoleId] = useState(user.roleId || "");
  const [statusId, setStatusId] = useState(user.statusId || "");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [statuses, setStatuses] = useState([]);
  const [roles, setRoles] = useState([]);
  const [errors, setErrors] = useState({
    userLastName: false,
    userFirstName: false,
    role: false,
    statusId: false,
  });

  useEffect(() => {
    Axios.get("http://localhost:8080/api/v1/list/statuses")
      .then((response) => {
        setStatuses(response.data);

        const status = response.data.find(
          (status) => status.status === user.status
        );
        if (status) {
          setStatusId(status.status_id);
        }
      })
      .catch((error) => {
        console.error("Error al recuperar los estados :", error);
      });
  }, [user.status]);

  useEffect(() => {
    Axios.get("http://localhost:8080/api/v1/list/roles")
      .then((response) => {
        setRoles(response.data);

        const role = response.data.find((role) => role.role === user.role);
        if (role) {
          setRoleId(role.role_id);
        }
      })
      .catch((error) => {
        console.error("Error al recuperar los roles :", error);
      });
  }, [user.role]);

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
      role_id: roleId,
      status_id: statusId,
    })
      .then((response) => {
        setUserLastName("");
        setUserFirstName("");
        setRoleId("");
        setStatusId("");
        setMessage("El usuario ha sido actualizado con éxito.");
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
        text={labels.PAGES.USER.UPDATE_USER_PAGE}
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
              placeholder="Ingrese el apellido del usuario a actualizar"
              className={`col-8 fs-2 ms-3 value ${
                errors.userLastName ? "error-border" : ""
              }`}
              onChange={(e) => {
                setUserLastName(e.target.value);
              }}
            />
          </div>
          <div className="value_label_container mb-4 ">
            <Typography
              level="p"
              text={labels.USERS.USER_FIRSTNAME()}
              className="label col-2 fw-bold"
            ></Typography>

            <Input
              type="text"
              name="userFirstName"
              value={userFirstName}
              placeholder="Ingrese el nombre del usuario a actualizar"
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
              placeholder="Ingrese el rol del usuario a actualizar"
              className={`col-8 fs-2 ms-3 value ${
                errors.role ? "error-border" : ""
              }`}
              onChange={(e) => {
                setRole(e.target.value);
                setErrors({ ...errors, role: false });
              }}
            /> */}
          </div>
          <div className="value_label_container">
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
              placeholder="Ingrese el estado del usuario a actualizar"
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
