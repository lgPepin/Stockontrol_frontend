import React, { useState } from "react";
import UpdateHeader from "../../components/Headers/UpdateHeader";
import labels from "../../config/labels";
import SideBar from "../../components/SideBar/SideBar";
import Axios from "axios";
import Input from "../../common/Input/Input";
import Typography from "../../common/Typography/Typography";
import Button from "react-bootstrap/Button";
import { useLocation } from "react-router-dom";

const UpdateCategoryPage = ({ onLogout }) => {
  const location = useLocation();
  const category = location.state?.category || {};
  const [categoryName, setCategoryName] = useState(
    category.category_name || ""
  );
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
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
      setError(
        "Todos los campos deben estar llenos para actualizar el proveedor."
      );
      setMessage("");
      setTimeout(() => {
        setError("");
      }, 5000);
      return;
    }

    Axios.put(
      `http://localhost:8080/api/v1/categories/update/${category.category_id}`,
      {
        category_name: categoryName,
      }
    )
      .then((response) => {
        setCategoryName("");
        setMessage("La categoria ha sido actualizada con éxito.");
        setError("");
        setErrors({});
        setTimeout(() => {
          setMessage("");
        }, 5000);
      })
      .catch((error) => {
        setMessage("");
        setError("Ya existe una categoria con este nombre");
        setTimeout(() => {
          setError("");
        }, 5000);
      });
  };

  return (
    <>
      <UpdateHeader
        text={labels.PAGES.CATEGORY.UPDATE_CATEGORY_PAGE}
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
              placeholder="Ingrese el nombre de la categoria a actualizar"
              className={`col-8 fs-2 ms-3 value ${
                errors.categoryName ? "error-border" : ""
              }`}
              onChange={(e) => {
                setCategoryName(e.target.value);
                setErrors({ ...errors, categoryName: false });
              }}
            />
          </div>
          {message && (
            <div
              className={"alert fs-3 mt-4 alert-success text-center"}
              role="alert"
            >
              {message}
            </div>
          )}
          {error && (
            <div
              className={"alert fs-3 mt-4 alert-danger text-center"}
              role="alert"
            >
              {error}
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

export default UpdateCategoryPage;
