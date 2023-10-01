import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout'
import NewCustomer, { action as actionCRM} from './pages/NewCustomer'
import Index, {loader as customerLoader } from './pages/index'
import ErrorPage from './components/ErrorPage'
import EditCustomer, {loader as editCustomerLoader, action as editCustomerAction} from './pages/EditCustomer'
import { action as deleteCustomerAction } from './components/Customer'


const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Index />,
        loader: customerLoader,
        errorElement: <ErrorPage/>
      },
      {
        path: '/customers/new',
        element: <NewCustomer />,
        action: actionCRM,
        errorElement: <ErrorPage/>
      },
      {
        path: '/customers/:customerId/edit',
        element: <EditCustomer />,
        loader: editCustomerLoader,
        action: editCustomerAction,
        errorElement: <ErrorPage/>
      },
      {
        path: '/customers/:customerId/delete',
        action: deleteCustomerAction

      }
    ]
  },

])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
