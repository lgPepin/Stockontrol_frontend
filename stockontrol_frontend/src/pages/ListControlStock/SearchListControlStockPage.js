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
import { CgPlayButtonO } from "react-icons/cg";
import Button from "react-bootstrap/esm/Button";
import { Link, useNavigate, useLocation } from "react-router-dom";

const SearchListControlStockPage = () => {
  const [listControlStockName, setListControlStockName] = useState("");
  const [listsControlStockList, setListsControlStockList] = useState([]);
  const [warningMessage, setWarningMessage] = useState("");
  const [noResultsMessage, setNoResultsMessage] = useState("");
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  // const [refresh, setRefresh] = useState(false);

  const location = useLocation();
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (location.state?.successMessage) {
      setSuccessMessage(location.state.successMessage);
    }
  }, [location.state]);

  // useEffect(() => {
  //   searchListControlStock();
  // }, [refresh]);

  const goToDetailsListControlStockPage = (listControlStock) => {
    navigate("/listControlStock/details", { state: { listControlStock } });
  };

  const goToUpdateListControlStockPage = (listControlStock) => {
    if (listControlStock.stock_control_list_status === "No activada") {
      navigate("/listControlStock/update", { state: { listControlStock } });
    } else {
      setErrorMessage(
        "Solo se puede editar las listas de control de stock con un estado No activada"
      );
      setTimeout(() => {
        setErrorMessage("");
      }, 5000);
    }
  };

  const deleteResultsList = () => {
    setListsControlStockList([]);
    setListControlStockName("");
    setNoResultsMessage("");
  };

  const searchListControlStock = () => {
    setConfirmationMessage("");
    setMessageType("");
    if (listControlStockName.length > 0 && listControlStockName.length < 3) {
      setWarningMessage(
        "Por favor ingresar al menos 3 caracteres para iniciar la busqueda"
      );
      setTimeout(() => {
        setWarningMessage("");
      }, 5000);
      setNoResultsMessage("");
      return;
    }

    setWarningMessage("");

    Axios.get("http://localhost:8080/api/v1/listsControlStock/get", {
      params: {
        searchListControlStockName: listControlStockName,
      },
    })
      .then((response) => {
        if (response.data.length === 0) {
          setNoResultsMessage("Lista de control de stock no encontrada");
        } else {
          setNoResultsMessage("");
        }
        setListsControlStockList(response.data || []);
      })
      .catch((error) => {
        console.error(
          "Error en la búsqueda de lista de control de stock :",
          error
        );
      });
  };

  const deleteListControlStock = (id, name, listControlStock) => {
    if (listControlStock.stock_control_list_status === "No activada") {
      Axios.delete(
        `http://localhost:8080/api/v1/listsControlStock/delete/${id}`
      )
        .then((response) => {
          setListsControlStockList((prevList) =>
            prevList.filter((list) => list.stock_control_list_id !== id)
          );
          setConfirmationMessage(
            `La lista de control de stock ${name} ha sido eliminada con éxito!`
          );
          setMessageType("primary");
          setTimeout(() => {
            setConfirmationMessage("");
          }, 5000);
        })
        .catch((error) => {
          console.error(
            "Error al suprimir la lista de control de stock",
            error
          );
          setConfirmationMessage(
            "Error al suprimir la lista de control de stock."
          );
          setMessageType("danger");
          setTimeout(() => {
            setConfirmationMessage("");
          }, 5000);
        });
    } else {
      setErrorMessage(
        "Solo se puede suprimir las listas de control de stock con un estado No activada"
      );
      setTimeout(() => {
        setErrorMessage("");
      }, 5000);
    }
  };

  const activateListControlStock = (listControlStock) => {
    if (listControlStock.stock_control_list_status === "No activada") {
      Axios.patch(
        `http://localhost:8080/api/v1/listsControlStock/activate/${listControlStock.stock_control_list_id}`,
        { status: "Activa" }
      )
        .then(() => {
          // setRefresh((prev) => !prev);
          navigate("/listControlStock/active", { state: { listControlStock } });
        })
        .catch((error) => {
          console.error(
            "Error al activar la lista de control de stock :",
            error
          );
          setErrorMessage("Error al activar la lista de control de stock.");
          setTimeout(() => {
            setErrorMessage("");
          }, 5000);
        });
    } else {
      setErrorMessage("La lista de control de stock ya fue activada.");
      setTimeout(() => {
        setErrorMessage("");
      }, 5000);
    }
  };

  return (
    <>
      <SearchHeader
        text={labels.PAGES.LISTA_CONTROL_STOCK.SEARCH_LISTA_CONTROL_STOCK_PAGE}
        pathCreate={"/listControlStock/create"}
        createButtonName={labels.BUTTONS.CREATE_LIST_CONTROL_STOCK_BUTTON}
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
              name="listControlStockName"
              value={listControlStockName}
              placeholder="Ingrese el nombre de la lista a buscar"
              className="col-9 fs-2 ms-3 value"
              onChange={(e) => {
                setListControlStockName(e.target.value);
              }}
            />
          </div>
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
          {warningMessage && (
            <div className="alert alert-danger fs-3 mt-4" role="alert">
              {warningMessage}
            </div>
          )}
          <Button
            variant="secondary"
            size="lg"
            className="text-black border-dark mt-5 offset-2 col-2"
            onClick={deleteResultsList}
          >
            Borrar Lista
          </Button>
          <Button
            variant="secondary"
            size="lg"
            className="text-black border-dark mt-5 offset-2 col-2"
            onClick={searchListControlStock}
          >
            Buscar
          </Button>
          {errorMessage && (
            <div className="alert alert-danger fs-3 mt-4" role="alert">
              {errorMessage}
            </div>
          )}
          <div className="separator my-4 col-10"></div>

          {successMessage && (
            <div className="alert alert-success fs-3 mt-4" role="alert">
              {successMessage}
            </div>
          )}

          {noResultsMessage ? (
            <Typography
              level="h3"
              text={noResultsMessage}
              className="text-danger mt-5 offset-1 fw-bold fs-1"
            />
          ) : (
            <table className="table table-striped table_size">
              <thead>
                <tr>
                  <th className="col-2">Nombre Lista de Control de Stock</th>
                  <th className="col-2">Estado</th>
                  <th className="col-1 table-icon">Ver</th>
                  <th className="col-1 table-icon">Editar</th>
                  <th className="col-1 table-icon">Eliminar</th>
                  <th className="col-1 table-icon">Activar</th>
                </tr>
              </thead>
              <tbody>
                {listsControlStockList.map((list, idx) => (
                  <tr key={idx}>
                    <td>
                      <Link
                        to="/listControlStock/details"
                        state={{ listControlStock: list }}
                      >
                        {list.stock_control_list_name}
                      </Link>
                    </td>
                    <td>{list.stock_control_list_status}</td>
                    <td className="table-icon">
                      <FaEye
                        className="icon custom_icon"
                        size={"1.3em"}
                        onClick={() => goToDetailsListControlStockPage(list)}
                      />
                    </td>
                    <td className="table-icon">
                      <BsFillPencilFill
                        className="icon custom_icon"
                        size={"1.3em"}
                        onClick={() => goToUpdateListControlStockPage(list)}
                      />
                    </td>
                    <td className="table-icon">
                      <RiDeleteBin6Fill
                        className="icon custom_icon"
                        size={"1.3em"}
                        onClick={() =>
                          deleteListControlStock(
                            list.stock_control_list_id,
                            list.stock_control_list_name,
                            list
                          )
                        }
                      />
                    </td>
                    <td className="table-icon">
                      {list.stock_control_list_status === "No activada" && (
                        <CgPlayButtonO
                          className="icon custom_icon"
                          size={"1.3em"}
                          onClick={() => activateListControlStock(list)}
                        />
                      )}
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

export default SearchListControlStockPage;
