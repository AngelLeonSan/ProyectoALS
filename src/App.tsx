import Login from "./pages/Login";
import Reports from './pages/Reports';
import Home from './pages/Home';
import PaginaError from './pages/PaginaError';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
//Creamos la esructura para navegar

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
    errorElement: <PaginaError />
  },
  {
    path: "/home",
    element: <Home />
  },
  {
    path: "/reports",
    element: <Reports />
  }
]);
export default function App() {
  
  return (
      <RouterProvider router={router} />
  );
}



