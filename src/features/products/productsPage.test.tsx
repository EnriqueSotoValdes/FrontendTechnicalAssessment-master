import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import '@testing-library/jest-dom';
import ProductsPage from './productsPage';
import * as productsApi from './productsApi';
import { Product } from "./productType";

jest.mock("../../api/axios", () => ({
  __esModule: true,
  default: {
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
  },
}));

jest.mock("./productsApi");
const mockedProductsApi = productsApi as jest.Mocked<typeof productsApi>;

describe("ProductsPage", () => {
  let mockProducts: Product[];
  beforeEach(() => {
    jest.clearAllMocks();
    mockProducts = [   
      {
        "id": 1,
        "productName": "Lapiz",
        "productType": 10,
        "numTerminal": 1001233123,
        "soldAt": "2019-01-09 14:26:17"
      },
    ];

    mockedProductsApi.getProducts.mockImplementation(() => {
      return Promise.resolve([...mockProducts]); 
    });
    mockedProductsApi.postProducts.mockImplementation(async (newProduct) => {
      mockProducts.push(newProduct);
    });
    mockedProductsApi.putProducts.mockImplementation(async (updatedProduct) => {
      const index = mockProducts.findIndex(c => c.id === updatedProduct.id);
      if (index !== -1) {
        mockProducts[index] = updatedProduct;
      }
    });
    mockedProductsApi.deleteProducts.mockImplementation(async (ProductToDelete) => {
      mockProducts = mockProducts.filter(c => c.id !== ProductToDelete.id);
    });

  });

  test('test created product', async () => { 

    render( <ProductsPage /> );

    fireEvent.click(screen.getByText("New Product"));
    
    fireEvent.change(screen.getByTestId("id"), { target: { value: '2' } });
    fireEvent.change(screen.getByTestId("productName"), { target: { value: "ejemploTest2" } });
    fireEvent.change(screen.getByTestId("productType"), { target: { value: 15 } });
    fireEvent.change(screen.getByTestId("numTerminal"), { target: { value: 1001244123 } });
    fireEvent.change(screen.getByTestId("soldAt"), { target: { value: "2019-01-09 14:26:17" } });
    
    fireEvent.click(screen.getByTestId("submit"));

    await waitFor(() => {
      expect(mockedProductsApi.postProducts).toHaveBeenCalledWith({
        id: '2',
        productName: "ejemploTest2",
        productType: "15",
        numTerminal: "1001244123",
        soldAt: "2019-01-09T14:26:17.000"
      });
    });

    const cards = screen.getAllByTestId(/^product-/);
    expect(cards).toHaveLength(mockProducts.length);
    expect(cards).toHaveLength(2);
  });

  test('test edit product', async () => { 

    render( <ProductsPage /> );

    await waitFor(() => {
      expect(screen.getByText("product name:Lapiz")).toBeInTheDocument();
    });

    fireEvent.click(screen.getAllByText("Edit")[0]);
    
    fireEvent.change(screen.getByTestId("productName"), {
      target: { value: "ejemploTest" },
    });
    
    fireEvent.click(screen.getByTestId("submit"));

    await waitFor(() => {
      expect(mockedProductsApi.putProducts).toHaveBeenCalledWith(  {
        id: 1,
        productName: "ejemploTest",
        productType: 10,
        numTerminal: 1001233123,
        soldAt: "2019-01-09 14:26:17"
      },);
    });

    await waitFor(() => {
      expect(screen.getByText("product name:ejemploTest")).toBeInTheDocument();
    });
  });

  test('test delete product', async () => { 

    render( <ProductsPage /> );

    await waitFor(() => {
      let cards = screen.getAllByTestId(/^product-/);
      expect(cards).toHaveLength(mockProducts.length);
      expect(cards).toHaveLength(1);
    });
    

    fireEvent.click(screen.getAllByText("Remove")[0]);
    
    await waitFor(() => {
      let cards = screen.queryAllByTestId(/^product-/);
      expect(cards).toHaveLength(mockProducts.length);
      expect(cards).toHaveLength(0);
    });
    
  });
});