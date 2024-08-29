import React, { useState } from "react";
import "./App.css";
import SearchProductPage from "./pages/Product/SearchProductPage";
import DetailsProductPage from "./pages/Product/DetailsProductPage";
import AlternativeDetailsProductPage from "./pages/Product/AlternativeDetailsProductPage";
import NegativeListDetailsProductPage from "./pages/Product/NegativeListDetailsProductPage";
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
import GenerateListNegativeStockPage from "./pages/ListNegativeStock/GenerateListNegativeStockPage";
import ExcelDataLoadingPage from "./pages/DataLoading/ExcelDataLoadingPage";
import LoginPage from "./pages/Login/LoginPage";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  console.log("isAuthenticated: ", isAuthenticated);

  const router = createBrowserRouter([
    {
      path: "/",
      element: isAuthenticated ? (
        <SearchProductPage onLogout={() => setIsAuthenticated(false)} />
      ) : (
        <Navigate to="/login" />
      ),
      errorElement: <NotFoundPage />,
    },
    {
      path: "/login",
      element: <LoginPage onLogin={() => setIsAuthenticated(true)} />,
    },
    {
      path: "/product/details",
      element: (
        <DetailsProductPage onLogout={() => setIsAuthenticated(false)} />
      ),
    },
    {
      path: "/product/alternativeDetails",
      element: (
        <AlternativeDetailsProductPage
          onLogout={() => setIsAuthenticated(false)}
        />
      ),
    },
    {
      path: "/product/negativeListDetails",
      element: (
        <NegativeListDetailsProductPage
          onLogout={() => setIsAuthenticated(false)}
        />
      ),
    },
    {
      path: "/product/create",
      element: <CreateProductPage onLogout={() => setIsAuthenticated(false)} />,
    },
    {
      path: "/product/update",
      element: <UpdateProductPage onLogout={() => setIsAuthenticated(false)} />,
    },
    {
      path: "/supplier/search",
      element: (
        <SearchSupplierPage onLogout={() => setIsAuthenticated(false)} />
      ),
    },
    {
      path: "/supplier/details",
      element: (
        <DetailsSupplierPage onLogout={() => setIsAuthenticated(false)} />
      ),
    },
    {
      path: "/supplier/create",
      element: (
        <CreateSupplierPage onLogout={() => setIsAuthenticated(false)} />
      ),
    },
    {
      path: "/supplier/update",
      element: (
        <UpdateSupplierPage onLogout={() => setIsAuthenticated(false)} />
      ),
    },
    {
      path: "/category/search",
      element: (
        <SearchCategoryPage onLogout={() => setIsAuthenticated(false)} />
      ),
    },
    {
      path: "/category/details",
      element: (
        <DetailsCategoryPage onLogout={() => setIsAuthenticated(false)} />
      ),
    },
    {
      path: "/category/create",
      element: (
        <CreateCategoryPage onLogout={() => setIsAuthenticated(false)} />
      ),
    },
    {
      path: "/category/update",
      element: (
        <UpdateCategoryPage onLogout={() => setIsAuthenticated(false)} />
      ),
    },
    {
      path: "/user/search",
      element: <SearchUserPage onLogout={() => setIsAuthenticated(false)} />,
    },
    {
      path: "/user/details",
      element: <DetailsUserPage onLogout={() => setIsAuthenticated(false)} />,
    },
    {
      path: "/user/create",
      element: <CreateUserPage onLogout={() => setIsAuthenticated(false)} />,
    },
    {
      path: "/user/update",
      element: <UpdateUserPage onLogout={() => setIsAuthenticated(false)} />,
    },
    {
      path: "/listControlStock/search",
      element: (
        <SearchListControlStockPage
          onLogout={() => setIsAuthenticated(false)}
        />
      ),
    },
    {
      path: "/listControlStock/details",
      element: (
        <DetailsListControlStockPage
          onLogout={() => setIsAuthenticated(false)}
        />
      ),
    },
    {
      path: "/listControlStock/create",
      element: (
        <CreateListControlStockPage
          onLogout={() => setIsAuthenticated(false)}
        />
      ),
    },
    {
      path: "/listControlStock/update",
      element: (
        <UpdateListControlStockPage
          onLogout={() => setIsAuthenticated(false)}
        />
      ),
    },
    {
      path: "/listControlStock/active",
      element: (
        <ActiveListControlStockPage
          onLogout={() => setIsAuthenticated(false)}
        />
      ),
    },
    {
      path: "/listNegativeStock/generate",
      element: (
        <GenerateListNegativeStockPage
          onLogout={() => setIsAuthenticated(false)}
        />
      ),
    },
    {
      path: "/dataIntegration/load",
      element: (
        <ExcelDataLoadingPage onLogout={() => setIsAuthenticated(false)} />
      ),
    },
  ]);

  return (
    <div className="App">
      <h1 className="text-center bg-secondary text-white customTitle">
        Stockontrol
      </h1>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
