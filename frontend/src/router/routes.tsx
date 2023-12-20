import { RouteObject } from "react-router-dom";
// Page imports
import LoginPage from '@pages/LoginPage'
import RegisterPage from '@pages/RegisterPage'
import HomePage from '@pages/HomePage'
import AdminPage from '@pages/AdminPage'
import ProfilePage from '@pages/ProfilePage'
import ProfileCard from '@components/ProfileCard'
import UpdateProfileForm from '@components/UpdateProfileForm'
import ChangePasswordForm from '@components/ChangePasswordForm'
import DeleteAccountForm from '@components/DeleteAccountForm'
import EventsPage from '@pages/EventsPage'

export type NavbarRouteObject = {
  to?: string;
  text?: string;
  onClick?: (e: React.MouseEvent<any>) => Promise<void>;
}

export type ProtectedRouteObject =
  RouteObject &
  NavbarRouteObject &
  {
    isAuthenticated?: boolean;
    adminOnly?: boolean;
    children?: ProtectedRouteObject[];
  }

/** Route information described here... (note: 'admin' can access 'user', but not vice-versa) */
const routes: ProtectedRouteObject[] = [
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "login",
    element: <LoginPage />,
    isAuthenticated: false,
    to: '/login',
    text: 'Login',
  },
  {
    path: "register",
    element: <RegisterPage />,
    isAuthenticated: false,
    to: '/register',
    text: 'Register',
  },
  {
    path: "profile",
    element: <ProfilePage />,
    isAuthenticated: true,
    to: '/profile',
    text: 'Profile',
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
    path: "events",
    element: <EventsPage />,
    isAuthenticated: true,
  },
  {
    path: "admin",
    element: <AdminPage />,
    isAuthenticated: true,
    adminOnly: true,
    to: '/admin',
    text: 'Admin',
  }
];

export default routes;