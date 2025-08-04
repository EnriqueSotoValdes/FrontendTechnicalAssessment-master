import axios from "../../api/axios";
import type { Client } from "./clientType";

export const getClients = async (): Promise<Client[]> => {
  const response = await axios.get<Client[]>("/clients");
  return response.data;
};

export const postClients = async (client: Client) => {
  await axios.post<Client[]>("/clients",client);
};

export const putClients = async (client: Client) => {
   await axios.put<Client[]>("/clients",client);
};

export const deleteClients = async (client: Client) => {
   await axios.delete<Client[]>("/clients",{
    data: client
  });
};

export const getClientById = async (id: string): Promise<Client> => {
  const response = await axios.get<Client>(`/clients/${id}`);
  return response.data;
};