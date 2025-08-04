import { Routes, Route } from 'react-router-dom';
import ClientsPage from '../features/clients/clientsPage';
import ProductsPage from '../features/products/productsPage';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<></>} />
      <Route path="/clientsPage" element={<ClientsPage />} />
      <Route path="/productsPage" element={<ProductsPage />} />
    </Routes>
  );
}