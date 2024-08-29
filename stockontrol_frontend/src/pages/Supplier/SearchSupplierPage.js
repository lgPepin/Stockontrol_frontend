import React, { useState, useEffect } from "react";
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
import { fetchUserRole } from "../../service/ConnectedUserData";

const SearchSupplierPage = ({ onLogout }) => {
  const [supplierName, setSupplierName] = useState("");
  const [supplierList, setSupplierList] = useState([]);
  const [warningMessage, setWarningMessage] = useState("");
  const [noResultsMessage, setNoResultsMessage] = useState("");
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [userRole, setUserRole] = useState(null);
  const allowedRoles = ["Administrador"];

  const navigate = useNavigate();

  const goToDetailsSupplierPage = (supplier) => {
    navigate("/supplier/details", { state: { supplier } });
  };

  const goToUpdateSupplierPage = (supplier) => {
    navigate("/supplier/update", { state: { supplier } });
  };

  const deleteResultsList = () => {
    setSupplierList([]);
    setSupplierName("");
    setNoResultsMessage("");
  };

  const searchSupplier = () => {
    setConfirmationMessage("");
    setMessageType("");
    if (supplierName.length > 0 && supplierName.length < 3) {
      setWarningMessage(
        "Por favor ingresar al menos 3 caracteres para iniciar la busqueda"
      );
      setNoResultsMessage("");
      setTimeout(() => {
        setWarningMessage("");
      }, 5000);

      return;
    }

    setWarningMessage("");

    Axios.get("http://localhost:8080/api/v1/suppliers/get", {
      params: {
        searchSupplierName: supplierName,
      },
    })
      .then((response) => {
        if (response.data.length === 0) {
          setNoResultsMessage("Proveedor no encontrado");
        } else {
          setNoResultsMessage("");
        }
        setSupplierList(response.data || []);
      })
      .catch((error) => {
        console.error("Error en la búsqueda de proveedores :", error);
      });
  };

  const deleteSupplier = (supplierName) => {
    Axios.patch(
      `http://localhost:8080/api/v1/suppliers/update-products/${supplierName}`
    )
      .then(() => {
        return Axios.delete(
          `http://localhost:8080/api/v1/suppliers/delete/${supplierName}`
        );
      })
      .then((response) => {
        setSupplierList((prevList) =>
          prevList.filter((supplier) => supplier.supplier_name !== supplierName)
        );
        setConfirmationMessage(
          `El proveedor ${supplierName} ha sido eliminado con éxito!`
        );
        setMessageType("primary");
        setTimeout(() => {
          setConfirmationMessage("");
        }, 5000);
      })
      .catch((error) => {
        console.error("Error al suprimir el proveedor", error);
        setConfirmationMessage("Error al suprimir el proveedor.");
        setMessageType("danger");
        setTimeout(() => {
          setConfirmationMessage("");
        }, 5000);
      });
  };

  useEffect(() => {
    const getUserRole = async () => {
      try {
        const role = await fetchUserRole();
        setUserRole(role);
      } catch (error) {
        console.error("Error al recuperar el rol del usuario:", error);
      }
    };

    getUserRole();
  }, []);

  return (
    <>
      <SearchHeader
        text={labels.PAGES.SUPPLIER.SEARCH_SUPPLIER_PAGE}
        pathCreate={"/supplier/create"}
        createButtonName={labels.BUTTONS.CREATE_SUPPLIER_BUTTON}
      />
      <div className="row align-items-start container_principal">
        <div className="col-2 sideBar_container">
          <SideBar onLogout={onLogout} />
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
              name="supplierName"
              value={supplierName}
              placeholder="Ingrese el nombre del proveedor a buscar"
              className="col-9 fs-2 ms-3 value"
              onChange={(e) => {
                setSupplierName(e.target.value);
              }}
            />
          </div>

          {warningMessage && (
            <div
              className={"alert fs-3 mt-4 alert-danger text-center"}
              role="alert"
            >
              {warningMessage}
            </div>
          )}

          {confirmationMessage && (
            <div
              className={`alert fs-3 mt-4 ${
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
            className="text-white border-dark mt-5 offset-2 col-2"
            onClick={deleteResultsList}
          >
            {labels.BUTTONS.DELETE_LIST_BUTTON}
          </Button>
          <Button
            variant="secondary"
            size="lg"
            className="text-white border-dark mt-5 offset-2 col-2"
            onClick={searchSupplier}
          >
            {labels.BUTTONS.SEARCH_BUTTON}
          </Button>

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
                  <th className="col-2">Nombre Proveedor</th>
                  <th className="col-1 table-icon">Ver</th>
                  <th className="col-1 table-icon">Editar</th>
                  {allowedRoles.includes(userRole) && (
                    <th className="col-1 table-icon">Eliminar</th>
                  )}
                </tr>
              </thead>
              <tbody>
                {supplierList.map((val, idx) => (
                  <tr key={idx}>
                    <td>
                      <Link to={"/supplier/details"} state={{ supplier: val }}>
                        {val.supplier_name}
                      </Link>
                    </td>
                    <td className="table-icon">
                      <FaEye
                        className="icon custom_icon"
                        size={"1.3em"}
                        onClick={() => goToDetailsSupplierPage(val)}
                      />
                    </td>
                    <td className="table-icon">
                      <BsFillPencilFill
                        className="icon custom_icon"
                        size={"1.3em"}
                        onClick={() => goToUpdateSupplierPage(val)}
                      />
                    </td>
                    {allowedRoles.includes(userRole) && (
                      <td className="table-icon">
                        <RiDeleteBin6Fill
                          className="icon custom_icon"
                          size={"1.3em"}
                          onClick={() => deleteSupplier(val.supplier_name)}
                        />
                      </td>
                    )}
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

export default SearchSupplierPage;
