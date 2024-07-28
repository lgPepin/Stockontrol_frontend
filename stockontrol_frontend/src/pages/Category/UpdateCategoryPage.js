import React, { useState } from "react";
import UpdateHeader from "../../components/Headers/UpdateHeader";
import labels from "../../config/labels";
import SideBar from "../../components/SideBar/SideBar";
import Axios from "axios";
import Input from "../../common/Input/Input";
import Typography from "../../common/Typography/Typography";
import Button from "react-bootstrap/Button";
import { useLocation } from "react-router-dom";

const UpdateCategoryPage = () => {
  const location = useLocation();
  const category = location.state?.category || {};

  const [categoryName, setCategoryName] = useState(
    category.category_name || ""
  );
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const submitCategory = () => {
    if (!categoryName) {
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
        text={labels.SUPPLIER.UPDATE_CATEGORY_PAGE}
        pathSearch={"/category/search"}
      />
      <div className="row align-items-start container_principal">
        <div className="col-2 sideBar_container">
          <SideBar />
        </div>
        <div className="offset-1 col-9 mt-5 frame">
          <div className="value_label_container mb-4">
            <Typography
              level="p"
              text="NOMBRE"
              className="label col-2 fw-bold"
            ></Typography>

            <Input
              type="text"
              name="categoryName"
              value={categoryName}
              placeholder="Ingrese el nombre de la categoria a actualizar"
              className="col-8 fs-2 ms-3 value"
              onChange={(e) => {
                setCategoryName(e.target.value);
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
            onClick={submitCategory}
          >
            Guardar
          </Button>
        </div>
      </div>
    </>
  );
};

export default UpdateCategoryPage;
