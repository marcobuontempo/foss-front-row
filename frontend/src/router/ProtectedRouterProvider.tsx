import React from 'react'
import { RouterProvider, createBrowserRouter, RouteObject } from 'react-router-dom'
import App from '../App'
import ErrorPage from '@pages/ErrorPage'
import { useAppSelector } from '@utils/useAppSelector'
import { selectIsAuthenticated, selectRole } from '@features/auth/authSlice'
import generateProtectedRoutes from '@router/routes'

export type ProtectedRouteObject =
  RouteObject &
  {
    isAuthenticated?: boolean;
    adminOnly?: boolean;
    children?: ProtectedRouteObject[];
  }

type Props = {}

export default function ProtectedRouterProvider({ }: Props) {
  const isAuthenticated = useAppSelector(selectIsAuthenticated)
  const role = useAppSelector(selectRole)

  // Protect/update routes based on priveleges
  const protectedRoutes = generateProtectedRoutes(isAuthenticated, role)

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