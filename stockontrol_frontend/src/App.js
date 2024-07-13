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
    path: "/product/create",
    element: <CreateProductPage />,
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
]);

function App() {
  return (
    <div className="App">
      <h1>Stockontrol</h1>
      <RouterProvider router={router} />
      Product
      <div className="my-2"></div>
      <div className="my-2"></div>
      Supplier
      <div className="my-2"></div>
      <div className="my-2"></div>
      Category
      <div className="my-2"></div>
      <div className="my-2"></div>
      User
      <div className="my-2"></div>
      <div className="my-2"></div>
    </div>
  );
}

export default App;
