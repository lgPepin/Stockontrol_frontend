import "./App.css";
import SearchProductPage from "./pages/Product/SearchProductPage";
import DetailsProductPage from "./pages/Product/DetailsProductPage";
import CreateProductPage from "./pages/Product/CreateProductPage";
import SearchSupplierPage from "./pages/Supplier/SearchSupplierPage";
import DetailsSupplierPage from "./pages/Supplier/DetailsSupplierPage";
import CreateSupplierPage from "./pages/Supplier/CreateSupplierPage";
import SearchCategoryPage from "./pages/Category/SearchCategoryPage";
import DetailsCategoryPage from "./pages/Category/DetailsCategoryPage";
import CreateCategoryPage from "./pages/Category/CreateCategoryPage";
import SearchUserPage from "./pages/User/SearchUserPage";
import DetailsUserPage from "./pages/User/DetailsUserPage";
import CreateUserPage from "./pages/User/CreateUserPage";

function App() {
  return (
    <div className="App">
      <h1>Stockontrol</h1>
      Product
      <SearchProductPage />
      <div className="my-2"></div>
      <DetailsProductPage />
      <div className="my-2"></div>
      <CreateProductPage />
      Supplier
      <SearchSupplierPage />
      <div className="my-2"></div>
      <DetailsSupplierPage />
      <div className="my-2"></div>
      <CreateSupplierPage />
      Category
      <SearchCategoryPage />
      <div className="my-2"></div>
      <DetailsCategoryPage />
      <div className="my-2"></div>
      <CreateCategoryPage />
      User
      <SearchUserPage />
      <div className="my-2"></div>
      <DetailsUserPage />
      <div className="my-2"></div>
      <CreateUserPage />
    </div>
  );
}

export default App;
