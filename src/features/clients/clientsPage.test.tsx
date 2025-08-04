import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import '@testing-library/jest-dom';
import ClientsPage from './clientsPage';
import * as clientsApi from './clientsApi';
import { Client } from "./clientType";

jest.mock("../../api/axios", () => ({
  __esModule: true,
  default: {
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
  },
}));

jest.mock("./clientsApi");
const mockedClientsApi = clientsApi as jest.Mocked<typeof clientsApi>;

describe("ClientsPage", () => {
  let mockClients: Client[];
  beforeEach(() => {
    jest.clearAllMocks();
    mockClients = [      
      {
        "id": 1,
        "docType": "nif",
        "docNum": "11223344E",
        "email": "eromani@sample.com",
        "givenName": "Enriqueta",
        "familyName1": "Romani",
        "phone": "668668668"
      },
    ];

    mockedClientsApi.getClients.mockImplementation(() => {
      return Promise.resolve([...mockClients]);
    });
    mockedClientsApi.postClients.mockImplementation(async (newClient) => {
      mockClients.push(newClient);
    });
    mockedClientsApi.putClients.mockImplementation(async (updatedClient) => {
      const index = mockClients.findIndex(c => c.id === updatedClient.id);
      if (index !== -1) {
        mockClients[index] = updatedClient;
      }
    });
    mockedClientsApi.deleteClients.mockImplementation(async (clientToDelete) => {
      mockClients = mockClients.filter(c => c.id !== clientToDelete.id);
    });

  });

  test('test created client', async () => { 

    render( <ClientsPage /> );

    fireEvent.click(screen.getByText("New Client"));
    
    fireEvent.change(screen.getByTestId("id"), { target: { value: '2' } });
    fireEvent.change(screen.getByTestId("docType"), { target: { value: "DNI" } });
    fireEvent.change(screen.getByTestId("docNum"), { target: { value: "12345678" } });
    fireEvent.change(screen.getByTestId("email"), { target: { value: "test@example.com" } });
    fireEvent.change(screen.getByTestId("givenName"), { target: { value: "Juan" } });
    fireEvent.change(screen.getByTestId("familyName1"), { target: { value: "Pérez" } });
    fireEvent.change(screen.getByTestId("phone"), { target: { value: "123456789" } });
    
    fireEvent.click(screen.getByTestId("submit"));

    await waitFor(() => {
      expect(mockedClientsApi.postClients).toHaveBeenCalledWith({
        id: '2',
        docType: "DNI",
        docNum: "12345678",
        email: "test@example.com",
        givenName: "Juan",
        familyName1: "Pérez",
        phone: "123456789",
      });
    });

    const cards = screen.getAllByTestId(/^client-/);
    expect(cards).toHaveLength(mockClients.length);
    expect(cards).toHaveLength(2);
  });

  test('test edit client', async () => { 

    render( <ClientsPage /> );

    await waitFor(() => {
      expect(screen.getByText("given name:Enriqueta")).toBeInTheDocument();
    });

    fireEvent.click(screen.getAllByText("Edit")[0]);
    
    fireEvent.change(screen.getByTestId("givenName"), {
      target: { value: "Pedro" },
    });
    
    fireEvent.click(screen.getByTestId("submit"));

    await waitFor(() => {
      expect(mockedClientsApi.putClients).toHaveBeenCalledWith(      
      {
        "id": 1,
        "docType": "nif",
        "docNum": "11223344E",
        "email": "eromani@sample.com",
        "givenName": "Pedro",
        "familyName1": "Romani",
        "phone": "668668668"
      },);
    });

    await waitFor(() => {
      expect(screen.getByText("given name:Pedro")).toBeInTheDocument();
    });
  });

  test('test delete client', async () => { 

    render( <ClientsPage /> );

    await waitFor(() => {
      let cards = screen.getAllByTestId(/^client-/);
      expect(cards).toHaveLength(mockClients.length);
      expect(cards).toHaveLength(1);
    });
    

    fireEvent.click(screen.getAllByText("Remove")[0]);
    
    await waitFor(() => {
      let cards = screen.queryAllByTestId(/^client-/);
      expect(cards).toHaveLength(mockClients.length);
      expect(cards).toHaveLength(0);
    });
    
  });
});