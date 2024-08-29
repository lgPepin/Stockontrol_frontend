import React, { useState } from "react";
import GenerateHeader from "../../components/Headers/GenerateHeader";
import labels from "../../config/labels";
import SideBar from "../../components/SideBar/SideBar";
import Axios from "axios";
import Typography from "../../common/Typography/Typography";
import Button from "react-bootstrap/esm/Button";
import Input from "../../common/Input/Input";
import * as XLSX from "xlsx";

const ExcelDataLoadingPage = ({ onLogout }) => {
  const [fileName, setFileName] = useState(null);
  const [productsList, setProductsList] = useState([]);
  const [warningMessage, setWarningMessage] = useState("");
  const [warningType, setWarningType] = useState("");
  const [jsonData, setJsonData] = useState(null);

  const handleFile = async (e) => {
    const file = e.target.files[0];
    setFileName(file.name);
    const data = await file.arrayBuffer();
    const workbook = XLSX.read(data);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];

    const jsonData = XLSX.utils.sheet_to_json(worksheet, {
      header: 1,
      defval: "",
    });
    setJsonData(jsonData);

    const products = jsonData.slice(1).map((row) => ({
      product_name: row[3],
      selling_price: row[17],
      purchase_price: row[26],
      stock: row[27],
      supplier_name: row[2],
    }));

    setProductsList(products);
  };

  const buildSuppliersList = (jsonData) => {
    if (jsonData.length === 0 || jsonData[0].length === 0) {
      console.error("jsonData es vacio o invalido");
      return [];
    }

    const headers = jsonData[0];
    const categoriaIndex = headers.indexOf("Categoría");

    if (categoriaIndex === -1) {
      console.error("Columna 'Categoría' no enconcontrada en headers");
      return [];
    }

    const categorias = jsonData.slice(1).map((row) => row[categoriaIndex]);
    const categoriasUnicas = [...new Set(categorias)];

    console.log(categoriasUnicas);
    return categoriasUnicas;
  };

  const handleDataUpload = async () => {
    if (!jsonData) {
      setWarningMessage("No hay datos para cargar.");
      setWarningType("error");
      return;
    }

    try {
      await Axios.delete(
        "http://localhost:8080/api/v1/loadData/deleteSuppliers"
      );
      setWarningMessage("Todos los proveedores fueron suprimidos con éxito");
      setWarningType("success");

      const categoriasUnicas = buildSuppliersList(jsonData);

      await Axios.post(
        "http://localhost:8080/api/v1/loadData/insertSuppliers",
        {
          categorias: categoriasUnicas,
        }
      );
      setWarningMessage("Datos cargados con éxito!");
      setWarningType("success");

      await Axios.post("http://localhost:8080/api/v1/loadData/insertProducts", {
        products: productsList,
      });
      setWarningMessage("Datos cargados con éxito!");
      setWarningType("success");
    } catch (error) {
      setWarningMessage("Error al cargar los datos.");
      setWarningType("error");
      console.error("Error al cargar los datos:", error);
    } finally {
      setTimeout(() => {
        setWarningMessage("");
        setWarningType("");
      }, 5000);
    }
  };

  return (
    <>
      <GenerateHeader
        text={labels.PAGES.DATA_LOADING.EXCEL_DATA_LOADING_PAGE}
        pathSearch={"/product/search"}
        backButtonName={labels.BUTTONS.BACK_BUTTON}
      />
      <div className="row align-items-start container_principal">
        <div className="col-2 sideBar_container">
          <SideBar onLogout={onLogout} />
        </div>
        <div className="offset-1 col-9 mt-4 ">
          <div className="value_label_container mb-4 offset-4">
            <Typography
              level="p"
              text="CARGAR ARCHIVO EXCEL"
              className="label col-3 fw-bold"
            ></Typography>
          </div>
          {fileName && (
            <p className="offset-4">
              FileName: <span>{fileName}</span>
            </p>
          )}
          <div className="offset-1 col-12">
            <Input
              type="file"
              name="productName"
              placeholder="Ingrese el nombre del producto a buscar"
              className="col-6 fs-2 ms-3"
              onChange={(e) => handleFile(e)}
            />
          </div>

          <Button
            variant="secondary"
            size="lg"
            className="text-white border-dark mt-5 offset-4 col-2"
            onClick={handleDataUpload}
          >
            {labels.BUTTONS.LOAD_DATA_BUTTON}
          </Button>

          {warningMessage && (
            <div
              className={`alert fs-3 mt-4 text-center ${
                warningType === "success" ? "alert-success" : "alert-danger"
              }`}
              role="alert"
            >
              {warningMessage}
            </div>
          )}

          <div className="separator my-4 offset-1 col-10"></div>
        </div>
      </div>
    </>
  );
};

export default ExcelDataLoadingPage;
