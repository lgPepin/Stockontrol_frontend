import React, { useState } from "react";
import SearchHeader from "../../components/Headers/SearchHeader";
import labels from "../../config/labels";
import SideBar from "../../components/SideBar/SideBar";
import Axios from "axios";
import Input from "../../common/Input/Input";
import Typography from "../../common/Typography/Typography";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { BsFillPencilFill } from "react-icons/bs";
import { FaEye } from "react-icons/fa";
import Button from "react-bootstrap/esm/Button";
import { Link, useNavigate } from "react-router-dom";

const SearchUserPage = () => {
  const [userLastName, setUserLastName] = useState("");
  const [userList, setUserList] = useState([]);
  const [warningMessage, setWarningMessage] = useState("");
  const [noResultsMessage, setNoResultsMessage] = useState("");
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const navigate = useNavigate();

  const goToDetailsUserPage = (user) => {
    navigate("/user/details", { state: { user } });
  };

  const goToUpdateUserPage = (user) => {
    navigate("/user/update", { state: { user } });
  };

  const searchUser = () => {
    setConfirmationMessage("");
    setMessageType("");
    if (userLastName.length > 0 && userLastName.length < 3) {
      setWarningMessage(
        "Por favor ingresar al menos 3 caracteres para iniciar la busqueda"
      );
      setNoResultsMessage("");

      return;
    }

    setWarningMessage("");

    Axios.get("http://localhost:8080/api/v1/users/get", {
      params: {
        searchUserLastName: userLastName,
      },
    })
      .then((response) => {
        if (response.data.length === 0) {
          setNoResultsMessage("No usuario encontrado");
        } else {
          setNoResultsMessage("");
        }
        setUserList(response.data || []);
      })
      .catch((error) => {
        console.error("Error en la búsqueda de usuarios :", error);
      });
  };

  const deleteUser = (user) => {
    Axios.delete(`http://localhost:8080/api/v1/users/delete/${user.user_id}`)
      .then((response) => {
        setUserList((prevList) =>
          prevList.filter((u) => u.user_id !== user.user_id)
        );
        setConfirmationMessage(
          `El usuario ${user.user_firstname} ${user.user_lastname} ha sido eliminado con éxito!`
        );
        setMessageType("primary");
        setTimeout(() => {
          setConfirmationMessage("");
        }, 5000);
        return;
      })
      .catch((error) => {
        console.error("Error al suprimir el usuario", error);
        setConfirmationMessage("Error al suprimir el usuario.");
        setMessageType("danger");
        setTimeout(() => {
          setConfirmationMessage("");
        }, 5000);
        return;
      });
  };

  return (
    <>
      <SearchHeader
        text={labels.USER.SEARCH_USER_PAGE}
        pathCreate={"/user/create"}
      />
      <div className="row align-items-start container_principal">
        <div className="col-2 sideBar_container">
          <SideBar />
        </div>
        <div className="offset-1 col-9 mt-4 ">
          <div className="value_label_container mb-4">
            <Typography
              level="p"
              text="NOMBRE"
              className="label col-1 fw-bold"
            ></Typography>

            <Input
              type="text"
              name="userName"
              placeholder="Ingrese el nombre del usuario a buscar"
              className="col-9 fs-2 ms-3 value"
              onChange={(e) => {
                setUserLastName(e.target.value);
              }}
            />
          </div>
          <Button
            variant="secondary"
            size="lg"
            className="text-black border-dark mt-5 offset-4 col-2"
            onClick={searchUser}
          >
            Buscar
          </Button>
          {warningMessage && (
            <Typography
              level="p"
              text={warningMessage}
              className="text-danger mt-3 fs-3"
            />
          )}
          {confirmationMessage && (
            <div className={`mt-3 fs-3 text-${messageType}`}>
              {confirmationMessage}
            </div>
          )}

          <div className="separator my-4 col-10"></div>

          {noResultsMessage ? (
            <Typography
              level="h3"
              text={noResultsMessage}
              className="text-danger mt-5 offset-3 fw-bold fs-1"
            />
          ) : (
            <table className="table table-striped table_size">
              <thead>
                <tr>
                  <th className="col-2">Apellido Usuario</th>
                  <th className="col-2">Nombre Usuario</th>
                  <th className="col-1 table-icon">Ver</th>
                  <th className="col-1 table-icon">Editar</th>
                  <th className="col-1 table-icon">Eliminar</th>
                </tr>
              </thead>
              <tbody>
                {userList.map((user) => (
                  <tr key={user.user_id}>
                    <td>
                      <Link to={"/user/details"} state={{ user }}>
                        {user.user_lastname}
                      </Link>
                    </td>
                    <td>
                      <Typography level="p" text={user.user_firstname} />
                    </td>
                    <td className="table-icon">
                      <FaEye
                        className="icon custom_icon"
                        size={"1.3em"}
                        onClick={() => goToDetailsUserPage(user)}
                      />
                    </td>
                    <td className="table-icon">
                      <BsFillPencilFill
                        className="icon custom_icon"
                        size={"1.3em"}
                        onClick={() => goToUpdateUserPage(user)}
                      />
                    </td>
                    <td className="table-icon">
                      <RiDeleteBin6Fill
                        className="icon custom_icon"
                        size={"1.3em"}
                        onClick={() => deleteUser(user)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default SearchUserPage;
