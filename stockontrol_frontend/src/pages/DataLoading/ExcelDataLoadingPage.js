import React, { useState } from "react";
import GenerateHeader from "../../components/Headers/GenerateHeader";
import labels from "../../config/labels";
import SideBar from "../../components/SideBar/SideBar";
import Axios from "axios";
import Typography from "../../common/Typography/Typography";
import Button from "react-bootstrap/esm/Button";
import Input from "../../common/Input/Input";
import * as XLSX from "xlsx";

const ExcelDataLoadingPage = () => {
  const [fileName, setFileName] = useState(null);
  const [productsList, setProductsList] = useState([]);
  const [warningMessage, setWarningMessage] = useState("");
  const [warningType, setWarningType] = useState(""); // 'success' ou 'error'

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

    // Extraction des données nécessaires
    const products = jsonData.slice(1).map((row) => ({
      product_name: row[3], // Colonne "Nombre"
      selling_price: row[17], // Colonne "PVP1"
      purchase_price: row[25], // Colonne "Costo"
      stock: row[27], // Colonne "Stock"
      supplier_name: row[2], // Colonne "Categoría"
      status: "Activo", // Statut par défaut
    }));

    setProductsList(products);
  };

  const handleDataUpload = async () => {
    try {
      // Insertion des fournisseurs
      const suppliers = [...new Set(productsList.map((p) => p.supplier_name))];
      await Axios.post(
        "http://localhost:8080/api/v1/loadData/loadSupplier",
        suppliers.map((supplier_name) => ({
          supplier_name,
          status: "Activo",
        }))
      );

      // Récupération des IDs des fournisseurs
      const { data: suppliersData } = await Axios.get(
        "http://localhost:8080/api/v1/loadData/suppliersId"
      );
      const supplierMap = suppliersData.reduce((acc, supplier) => {
        acc[supplier.supplier_name] = supplier.supplier_id;
        return acc;
      }, {});

      // Préparation des produits avec supplier_id
      const productsWithSupplierId = productsList.map((product) => ({
        ...product,
        supplier_id: supplierMap[product.supplier_name],
      }));

      // Insertion des produits
      await Axios.post(
        "http://localhost:8080/api/v1/loadData/loadProduct",
        productsWithSupplierId
      );

      // Afficher le message de succès
      setWarningType("success");
      setWarningMessage("Datos cargados con éxito!");
    } catch (error) {
      // Afficher le message d'erreur
      setWarningType("error");
      setWarningMessage("El archivo contiene demasiados datos para cargarlos.");
      console.error(error);
    } finally {
      // Effacer le message après 5 secondes
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
          <SideBar />
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
            className="text-black border-dark mt-5 offset-4 col-2"
            onClick={handleDataUpload}
          >
            Cargar datos
          </Button>
          {warningMessage && (
            <div
              className={`alert fs-3 mt-4 ${
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
