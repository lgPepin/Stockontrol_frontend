import "./App.css";
import SearchHeader from "./components/Headers/SearchHeader";
import DetailsHeader from "./components/Headers/DetailsHeader";
import CreateHeader from "./components/Headers/CreateHeader";

function App() {
  return (
    <div className="App">
      <h1>Stockontrol</h1>
      <SearchHeader text={"Buscar un Producto"} />
      <div className="my-2"></div>
      <DetailsHeader text={"Detalle del producto"} />
      <div className="my-2"></div>
      <CreateHeader text={"Crear un Producto"} />
    </div>
  );
}

export default App;
