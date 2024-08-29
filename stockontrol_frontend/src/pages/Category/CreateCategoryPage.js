import React, { useState } from "react";
import CreateHeader from "../../components/Headers/CreateHeader";
import labels from "../../config/labels";
import SideBar from "../../components/SideBar/SideBar";
import Axios from "axios";
import Input from "../../common/Input/Input";
import Typography from "../../common/Typography/Typography";
import Button from "react-bootstrap/Button";

const CreateCategoryPage = ({ onLogout }) => {
  const [categoryName, setCategoryName] = useState("");
  const [categoriesList, setCategoriesList] = useState([]);
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [errors, setErrors] = useState({
    categoryName: false,
  });

  const validInputs = () => {
    const errorsObject = {
      categoryName: !categoryName,
    };

    setErrors(errorsObject);

    return !Object.values(errorsObject).some((value) => value);
  };

  const submitCategory = () => {
    if (!validInputs()) {
      setConfirmationMessage(
        "Todos los campos deben estar llenos para crear el producto."
      );
      setMessageType("danger");
      return;
    }

    Axios.post("http://localhost:8080/api/v1/categories/create", {
      categoryName: categoryName,
    })
      .then((response) => {
        setCategoriesList([
          ...categoriesList,
          {
            category_name: categoryName,
          },
        ]);
        setCategoryName("");
        setErrors({});
        setConfirmationMessage("Categoria creada con éxito!");
        setMessageType("primary");
        setTimeout(() => {
          setConfirmationMessage("");
        }, 5000);
        return;
      })
      .catch((error) => {
        console.error("Error al crear la categoria!", error);
        setConfirmationMessage("Ya existe una categoria con este nombre");
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
        text={labels.PAGES.CATEGORY.CREATE_CATEGORY_PAGE}
        pathSearch={"/category/search"}
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
              text={labels.CATEGORIES.CATEGORY_NAME()}
              className="label col-2 fw-bold"
            ></Typography>

            <Input
              type="text"
              name="categoryName"
              value={categoryName}
              placeholder="Ingrese el nombre de la categoria a crear"
              className={`col-8 fs-2 ms-3 value ${
                errors.categoryName ? "error-border" : ""
              }`}
              onChange={(e) => {
                setCategoryName(e.target.value);
                setErrors({ ...errors, categoryName: false });
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
            onClick={submitCategory}
          >
            {labels.BUTTONS.SAVE_BUTTON}
          </Button>
        </div>
      </div>
    </>
  );
};

export default CreateCategoryPage;
