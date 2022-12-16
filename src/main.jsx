import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout';
import NuevoCliente, {
  action as nuevoClienteAction,
} from './pages/NuevoCliente';
import Index, { loader as clienteLoader } from './pages/Index';
import ErrorPage from './components/ErrorPage';
import EditarCliente, {
  action as editarClienteAction,
  loader as editarClienteLoader,
} from './components/EditarCliente';
import { action as eliminarAction } from './components/Cliente';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Index />,
        loader: clienteLoader,
        errorElement: <ErrorPage />,
      },
      {
        path: '/cliente/nuevo',
        element: <NuevoCliente />,
        action: nuevoClienteAction,
        errorElement: <ErrorPage />,
      },
      {
        path: '/cliente/:clienteId/editar',
        element: <EditarCliente />,
        errorElement: <ErrorPage />,
        loader: editarClienteLoader,
        action: editarClienteAction,
      },
      {
        path: '/cliente/:clienteId/eliminar',
        action: eliminarAction,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
