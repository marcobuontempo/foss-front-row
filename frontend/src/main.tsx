/* Default imports */
import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

/* Custom CSS */
import './index.css'
import './reset.css'

/* Bootstrap */
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

/* Redux */
import { Provider } from 'react-redux'
import store from './store.ts'

/* Configs */
import '@utils/axios-config.ts'

/* Other */
import { initialiseAuthDataFromStorage } from '@utils/authStorage.ts'
import { ProtectedRouteObject } from './types/ProtectedRouteObject.ts'

/* Pages */
import App from './App.tsx'
import LoginPage from '@pages/LoginPage'
import ErrorPage from '@pages/ErrorPage'
import RegisterPage from '@pages/RegisterPage'
import HomePage from '@pages/HomePage'


// Initialise auth data from localStorage
initialiseAuthDataFromStorage();


const protectedRoutes: ProtectedRouteObject[] = [
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "login",
    element: <LoginPage />,
    isAuthenticated: false,
  },
  {
    path: "register",
    element: <RegisterPage />,
    isAuthenticated: true,
  }
];

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: protectedRoutes,
  },
]);


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
