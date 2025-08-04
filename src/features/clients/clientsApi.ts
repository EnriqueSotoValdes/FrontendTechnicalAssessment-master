import axios from "../../api/axios";
import type { Client } from "./clientType";

export const getClients = async (): Promise<Client[]> => {
  const response = await axios.get<Client[]>("/clients");
  return response.data;
};

export const postClients = async (client: Client): Promise<Client[]> => {
  const response = await axios.post<Client[]>("/clients",client);
  return response.data;
};

export const putClients = async (client: Client): Promise<Client[]> => {
  const response = await axios.put<Client[]>("/clients",client);
  return response.data;
};

export const deleteClients = async (client: Client): Promise<Client[]> => {
  const response = await axios.delete<Client[]>("/clients",{
    data: client
  });
  return response.data;
};

export const getClientById = async (id: string): Promise<Client> => {
  const response = await axios.get<Client>(`/clients/${id}`);
  return response.data;
};