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

const SearchCategoryPage = () => {
  const [categoryName, setCategoryName] = useState("");
  const [categoryList, setCategoryList] = useState([]);
  const [warningMessage, setWarningMessage] = useState("");
  const [noResultsMessage, setNoResultsMessage] = useState("");
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const navigate = useNavigate();

  const goToDetailsCategoryPage = (category) => {
    navigate("/category/details", { state: { category } });
  };

  const goToUpdateCategoryPage = (category) => {
    navigate("/category/update", { state: { category } });
  };

  const searchCategory = () => {
    setConfirmationMessage("");
    setMessageType("");
    if (categoryName.length > 0 && categoryName.length < 3) {
      setWarningMessage(
        "Por favor ingresar al menos 3 caracteres para iniciar la busqueda"
      );
      setNoResultsMessage("");
      return;
    }

    setWarningMessage("");

    Axios.get("http://localhost:8080/api/v1/categories/get", {
      params: {
        searchCategoryName: categoryName,
      },
    })
      .then((response) => {
        if (response.data.length === 0) {
          setNoResultsMessage("No categoria encontrada");
        } else {
          setNoResultsMessage("");
        }
        setCategoryList(response.data || []);
      })
      .catch((error) => {
        console.error("Error en la búsqueda de categorias :", error);
      });
  };

  const deleteCategory = (categoryName) => {
    Axios.delete(
      `http://localhost:8080/api/v1/categories/delete/${categoryName}`
    )
      .then((response) => {
        setCategoryList((prevList) =>
          prevList.filter((category) => category.category_name !== categoryName)
        );
        setConfirmationMessage(
          `La categoría ${categoryName} ha sido eliminada con éxito!`
        );
        setMessageType("primary");
        setTimeout(() => {
          setConfirmationMessage("");
        }, 5000);
        return;
      })
      .catch((error) => {
        console.error("Error al suprimir la categoria", error);
        setConfirmationMessage("Error al suprimir la categoria.");
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
        text={labels.CATEGORY.SEARCH_CATEGORY_PAGE}
        pathCreate={"/category/create"}
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
              name="categoryName"
              placeholder="Ingrese el nombre de la categoria a buscar"
              className="col-9 fs-2 ms-3 value"
              onChange={(e) => {
                setCategoryName(e.target.value);
              }}
            />
          </div>
          <Button
            variant="secondary"
            size="lg"
            className="text-black border-dark mt-5 offset-4 col-2"
            onClick={searchCategory}
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
                  <th className="col-2">Nombre Categoria</th>
                  <th className="col-1 table-icon">Ver</th>
                  <th className="col-1 table-icon">Editar</th>
                  <th className="col-1 table-icon">Eliminar</th>
                </tr>
              </thead>
              <tbody>
                {categoryList.map((val, idx) => (
                  <tr key={idx}>
                    <td>
                      <Link to={"/category/details"} state={{ category: val }}>
                        {val.category_name}
                      </Link>
                    </td>
                    <td className="table-icon">
                      <FaEye
                        className="icon custom_icon"
                        size={"1.3em"}
                        onClick={() => goToDetailsCategoryPage(val)}
                      />
                    </td>
                    <td className="table-icon">
                      <BsFillPencilFill
                        className="icon custom_icon"
                        size={"1.3em"}
                        onClick={() => goToUpdateCategoryPage(val)}
                      />
                    </td>
                    <td className="table-icon">
                      <RiDeleteBin6Fill
                        className="icon custom_icon"
                        size={"1.3em"}
                        onClick={() => deleteCategory(val.category_name)}
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

export default SearchCategoryPage;
