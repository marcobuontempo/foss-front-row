import React from 'react'
import { RouterProvider, createBrowserRouter, RouteObject } from 'react-router-dom'
import App from '../../App'
import LoginPage from '@pages/LoginPage'
import ErrorPage from '@pages/ErrorPage'
import RegisterPage from '@pages/RegisterPage'
import HomePage from '@pages/HomePage'
import { useAppSelector } from '@utils/useAppSelector'
import { selectIsAuthenticated, selectRole } from '@features/auth/authSlice'
import AdminPage from '@pages/AdminPage'
import ProfilePage from '@pages/ProfilePage'
import ProfileCard from '@components/ProfileCard'
import UpdateProfileForm from '@components/UpdateProfileForm'
import ChangePasswordForm from '@components/ChangePasswordForm'
import DeleteAccountForm from '@components/DeleteAccountForm'

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

  // Define each route and options
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
      children: [
        {
          path: "",
          element: <ProfileCard />
        },
        {
          path: "update",
          element: <UpdateProfileForm />
        },
        {
          path: "change-password",
          element: <ChangePasswordForm />
        },
        {
          path: "delete-account",
          element: <DeleteAccountForm />
        }
      ]
    },
    {
      path: "admin",
      element: <AdminPage />,
      isAuthenticated: true,
      adminOnly: true,
    }
  ];

  // Protect/update routes based on priveleges
  const protectedRoutes = routes.map(route => {
    // Route requires admin **isAuthorised=undefined routes will still be unaccessible if admin rights do not match
    if (route.adminOnly && role !== 'admin') {
      route.element = <ErrorPage customText='Unauthorised Access' />;
    }

    // route is only valid for (un)/authenticated users. **isAuthorised=undefined is available to everyone
    if (route.isAuthenticated !== isAuthenticated && route.isAuthenticated !== undefined) {
      route.element = <ErrorPage customText={`Unauthorised Access - ${isAuthenticated ? "Logout" : "Login"} to Continue`} />;
    }

    // Return route (incl. route.element modifications)
    return route;
  })

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