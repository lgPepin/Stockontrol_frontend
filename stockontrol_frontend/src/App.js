import "./App.css";
import SearchProductPage from "./pages/Product/SearchProductPage";
import DetailsProductPage from "./pages/Product/DetailsProductPage";
import AlternativeDetailsProductPage from "./pages/Product/AlternativeDetailsProductPage";
import CreateProductPage from "./pages/Product/CreateProductPage";
import UpdateProductPage from "./pages/Product/UpdateProductPage";
import SearchSupplierPage from "./pages/Supplier/SearchSupplierPage";
import DetailsSupplierPage from "./pages/Supplier/DetailsSupplierPage";
import CreateSupplierPage from "./pages/Supplier/CreateSupplierPage";
import UpdateSupplierPage from "./pages/Supplier/UpdateSupplierPage";
import SearchCategoryPage from "./pages/Category/SearchCategoryPage";
import DetailsCategoryPage from "./pages/Category/DetailsCategoryPage";
import CreateCategoryPage from "./pages/Category/CreateCategoryPage";
import UpdateCategoryPage from "./pages/Category/UpdateCategoryPage";
import SearchUserPage from "./pages/User/SearchUserPage";
import DetailsUserPage from "./pages/User/DetailsUserPage";
import CreateUserPage from "./pages/User/CreateUserPage";
import UpdateUserPage from "./pages/User/UpdateUserPage";
import SearchListControlStockPage from "./pages/ListControlStock/SearchListControlStockPage";
import DetailsListControlStockPage from "./pages/ListControlStock/DetailsListControlStockPage";
import CreateListControlStockPage from "./pages/ListControlStock/CreateListControlStockPage";
import UpdateListControlStockPage from "./pages/ListControlStock/UpdateListControlStockPage";
import ActiveListControlStockPage from "./pages/ListControlStock/ActiveListControlStockPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <SearchProductPage />,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/product/details",
    element: <DetailsProductPage />,
  },
  {
    path: "/product/alternativeDetails",
    element: <AlternativeDetailsProductPage />,
  },
  {
    path: "/product/create",
    element: <CreateProductPage />,
  },
  {
    path: "/product/update",
    element: <UpdateProductPage />,
  },
  {
    path: "/supplier/search",
    element: <SearchSupplierPage />,
  },
  {
    path: "/supplier/details",
    element: <DetailsSupplierPage />,
  },
  {
    path: "/supplier/create",
    element: <CreateSupplierPage />,
  },
  {
    path: "/supplier/update",
    element: <UpdateSupplierPage />,
  },
  {
    path: "/category/search",
    element: <SearchCategoryPage />,
  },
  {
    path: "/category/details",
    element: <DetailsCategoryPage />,
  },
  {
    path: "/category/create",
    element: <CreateCategoryPage />,
  },
  {
    path: "/category/update",
    element: <UpdateCategoryPage />,
  },
  {
    path: "/user/search",
    element: <SearchUserPage />,
  },
  {
    path: "/user/details",
    element: <DetailsUserPage />,
  },
  {
    path: "/user/create",
    element: <CreateUserPage />,
  },
  {
    path: "/user/update",
    element: <UpdateUserPage />,
  },
  {
    path: "/listControlStock/search",
    element: <SearchListControlStockPage />,
  },
  {
    path: "/listControlStock/details",
    element: <DetailsListControlStockPage />,
  },
  {
    path: "/listControlStock/create",
    element: <CreateListControlStockPage />,
  },
  {
    path: "/listControlStock/update",
    element: <UpdateListControlStockPage />,
  },
  {
    path: "/listControlStock/active",
    element: <ActiveListControlStockPage />,
  },
]);

function App() {
  return (
    <div className="App">
      <h1>Stockontrol</h1>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
