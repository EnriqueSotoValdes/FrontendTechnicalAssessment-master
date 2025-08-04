
import { Link } from 'react-router-dom';
import './App.css'
import AppRoutes from './routes/appRoutes';

function App() {

  return (
    <>
      <nav className='navbar' >
        <Link className='routeChangeButton' to="/">Home</Link>
        <Link className='routeChangeButton' to="/clientsPage">Clientes</Link>
        <Link className='routeChangeButton' to="/productsPage">Productos</Link>
      </nav>
      <div className='container'>
        <AppRoutes />
      </div>
    </>
  )
}

export default App
