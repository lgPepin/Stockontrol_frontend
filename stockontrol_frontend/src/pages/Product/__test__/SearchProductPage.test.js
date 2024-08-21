import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import SearchProductPage from "../SearchProductPage";
import Axios from "axios";
import { act } from "react";
import axiosMock from "axios";
import userEvent from "@testing-library/user-event";

jest.mock("axios");

test("displays a warning message when the input length is less than 3 characters", () => {
  render(
    <BrowserRouter>
      <SearchProductPage />
    </BrowserRouter>
  );

  const input = screen.getByPlaceholderText(
    "Ingrese el nombre del producto a buscar"
  );
  fireEvent.change(input, { target: { value: "ab" } });

  const searchButton = screen.getByText("Buscar");
  fireEvent.click(searchButton);

  expect(
    screen.getByText(
      "Por favor ingresar al menos 3 caracteres para iniciar la busqueda"
    )
  ).toBeInTheDocument();
});

test("displays the list of products after a successful search", async () => {
  Axios.get.mockResolvedValueOnce({
    data: [
      {
        product_id: 1,
        product_name: "Product 1",
        stock: 10,
        category_name: "Category 1",
        supplier_name: "Supplier 1",
      },
      {
        product_id: 2,
        product_name: "Product 2",
        stock: 5,
        category_name: "Category 2",
        supplier_name: "Suppllier 2",
      },
    ],
  });

  render(
    <BrowserRouter>
      <SearchProductPage />
    </BrowserRouter>
  );

  const input = screen.getByPlaceholderText(
    "Ingrese el nombre del producto a buscar"
  );
  fireEvent.change(input, { target: { value: "Product" } });

  const searchButton = screen.getByText("Buscar");
  await act(async () => {
    fireEvent.click(searchButton);
  });

  expect(screen.getByText("Product 1")).toBeInTheDocument();
  expect(screen.getByText("Product 2")).toBeInTheDocument();
});

test("displays a message when no product is found", async () => {
  Axios.get.mockResolvedValueOnce({ data: [] });

  render(
    <BrowserRouter>
      <SearchProductPage />
    </BrowserRouter>
  );

  const input = screen.getByPlaceholderText(
    "Ingrese el nombre del producto a buscar"
  );
  fireEvent.change(input, { target: { value: "ExistingProduct" } });

  const searchButton = screen.getByText("Buscar");
  await act(async () => {
    fireEvent.click(searchButton);
  });

  expect(screen.getByText("No producto encontrado")).toBeInTheDocument();
});

test("performs a product search with the correct parameters", async () => {
  const mockGet = jest.fn().mockResolvedValueOnce({ data: [] });
  Axios.get = mockGet;

  render(
    <BrowserRouter>
      <SearchProductPage />
    </BrowserRouter>
  );

  const input = screen.getByPlaceholderText(
    "Ingrese el nombre del producto a buscar"
  );
  fireEvent.change(input, { target: { value: "ProductTest" } });

  const searchButton = screen.getByText("Buscar");
  await act(async () => {
    fireEvent.click(searchButton);
  });

  expect(mockGet).toHaveBeenCalledWith("http://localhost:8080/api/v1/get", {
    params: {
      searchProductName: "ProductTest",
      searchSupplier: "",
      searchCategory: "",
    },
  });
});

describe("SearchProductPage", () => {
  it("should display delete icons when products are available", async () => {
    axiosMock.get.mockResolvedValue({
      data: [
        {
          product_id: 1,
          product_name: "Product 1",
          stock: 10,
          category_name: "Category 1",
          supplier_name: "Supplier 1",
        },
      ],
    });

    render(
      <BrowserRouter>
        <SearchProductPage />
      </BrowserRouter>
    );

    userEvent.type(
      screen.getByPlaceholderText("Ingrese el nombre del producto a buscar"),
      "Product 1"
    );
    userEvent.click(screen.getByText("Buscar"));

    await waitFor(() => {
      expect(screen.getByTestId("delete-icon")).toBeInTheDocument();
    });
  });
});

test("displays products grouped by supplier", async () => {
  Axios.get.mockResolvedValueOnce({
    data: [
      {
        product_id: 1,
        product_name: "Product 1",
        stock: 10,
        category_name: "Category 1",
        supplier_name: "Supplier 1",
      },
      {
        product_id: 2,
        product_name: "Product 2",
        stock: 5,
        category_name: "Category 2",
        supplier_name: "Supplier 1",
      },
    ],
  });

  render(
    <BrowserRouter>
      <SearchProductPage />
    </BrowserRouter>
  );

  const input = screen.getByPlaceholderText(
    "Ingrese el nombre del producto a buscar"
  );
  fireEvent.change(input, { target: { value: "Product" } });

  const searchButton = screen.getByText("Buscar");
  await act(async () => {
    fireEvent.click(searchButton);
  });

  expect(screen.getByText("Proveedor: Supplier 1")).toBeInTheDocument();
  expect(screen.getByText("Product 1")).toBeInTheDocument();
  expect(screen.getByText("Product 2")).toBeInTheDocument();
});
