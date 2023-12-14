import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import App from '../../App'
import LoginPage from '@pages/LoginPage'
import ErrorPage from '@pages/ErrorPage'
import RegisterPage from '@pages/RegisterPage'
import HomePage from '@pages/HomePage'
import { ProtectedRouteObject } from 'src/types/ProtectedRouteObject.ts'
import { useAppSelector } from '@utils/useAppSelector'
import { selectIsAuthenticated, selectRole } from '@features/auth/authSlice'
import AdminPage from '@pages/AdminPage'
import ProfilePage from '@pages/ProfilePage'

type Props = {}

export default function ProtectedRouterProvider({ }: Props) {
  const isAuthenticated = useAppSelector(selectIsAuthenticated)
  const role = useAppSelector(selectRole)

  // Define each route and access
  const routes: ProtectedRouteObject[] = [
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
      isAuthenticated: false,
    },
    {
      path: "profile",
      element: <ProfilePage />,
      isAuthenticated: true,
    },
    {
      path: "admin",
      element: <AdminPage />,
      isAuthenticated: true,
      adminOnly: true,
    }
  ];

  const protectedRoutes = routes.map(route => {
    if (route.adminOnly === true && role !== 'admin') { route.element = <ErrorPage />; return route } // don't allow access to admin routes if not 'admin' role
    if (route.isAuthenticated === undefined) return route;  // allow access to all routes that don't explicitly define authentication requirements (unless adminOnly)
    if (route.isAuthenticated !== isAuthenticated) { route.element = <ErrorPage />; return route } // don't allow access to authenticated routes if unauthenticated
    return route
  })
  console.log(protectedRoutes)

  // Setup Router
  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      errorElement: <ErrorPage />,
      children: protectedRoutes,
    },
  ]);

  return (
    <RouterProvider router={router} />
  )
}