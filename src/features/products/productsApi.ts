import axios from "../../api/axios";
import type { Product } from "./productType";

export const getProducts = async (): Promise<Product[]> => {
  const response = await axios.get<Product[]>("/products");
  return response.data;
};

export const postProducts = async (product: Product) => {
  await axios.post<Product[]>("/products",product);
};

export const putProducts = async (product: Product) => {
  await axios.put<Product[]>("/products",product);
};

export const deleteProducts = async (product: Product) => {
  await axios.delete<Product[]>("/products",{
    data: product
  });
};

export const getProductById = async (id: string): Promise<Product> => {
  const response = await axios.get<Product>(`/products/${id}`);
  return response.data;
};