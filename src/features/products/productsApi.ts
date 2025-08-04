import axios from "../../api/axios";
import type { Product } from "./productType";

export const getProducts = async (): Promise<Product[]> => {
  const response = await axios.get<Product[]>("/products");
  return response.data;
};

export const postProducts = async (product: Product): Promise<Product[]> => {
  const response = await axios.post<Product[]>("/products",product);
  return response.data;
};

export const putProducts = async (product: Product): Promise<Product[]> => {
  const response = await axios.put<Product[]>("/products",product);
  return response.data;
};

export const deleteProducts = async (product: Product): Promise<Product[]> => {
  const response = await axios.delete<Product[]>("/products",{
    data: product
  });
  return response.data;
};

export const getProductById = async (id: string): Promise<Product> => {
  const response = await axios.get<Product>(`/products/${id}`);
  return response.data;
};