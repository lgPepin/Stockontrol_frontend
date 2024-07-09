import "./App.css";
import SearchHeader from "./components/Headers/SearchHeader";
import DetailsHeader from "./components/Headers/DetailsHeader";
import CreateHeader from "./components/Headers/CreateHeader";

function App() {
  return (
    <div className="App">
      <h1>Stockontrol</h1>
      <SearchHeader />
      <div className="my-2"></div>
      <DetailsHeader />
      <div className="my-2"></div>
      <CreateHeader />
    </div>
  );
}

export default App;
