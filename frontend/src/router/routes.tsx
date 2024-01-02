import { RouteObject } from "react-router-dom";
import { AuthState } from "@features/auth/authSlice";
// Page imports
import LoginPage from '@pages/LoginPage'
import RegisterPage from '@pages/RegisterPage'
import LogoutPage from '@pages/LogoutPage'
import HomePage from '@pages/HomePage'
import AdminPage from '@pages/AdminPage'
import ProfilePage from '@pages/ProfilePage'
import ProfileCard from '@components/ProfileCard'
import UpdateProfileForm from '@components/UpdateProfileForm'
import ChangePasswordForm from '@components/ChangePasswordForm'
import DeleteAccountForm from '@components/DeleteAccountForm'
import EventsPage from '@pages/EventsPage'
import ErrorPage from "@pages/ErrorPage";
import CreateEventForm from "@components/CreateEventForm";
import EventInformationDisplay from "@components/EventInformationDisplay";
import AllEventsDisplay from "@components/AllEventsDisplay";
import CartPage from "@pages/CartPage";
import OrdersDisplay from "@components/OrdersDisplay";
import ProfileSettingsDisplay from "@components/ProfileSettingsDisplay";
import ManageEvents from "@components/ManageEvents";
import UpdateEventForm from "@components/UpdateEventForm";

export type ProtectedRouteObject =
  RouteObject &
  {
    isAuthenticated?: boolean;
    adminOnly?: boolean;
  }

/** Route information described here
 *  - can ONLY apply protection on top level routes (e.g. /profile, but not /profile/update), but children will inherit parent protection
 *  - role:'admin' can access role:'user' routes, but not vice-versa
 */
export const routes: ProtectedRouteObject[] = [
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
    path: "events",
    element: <EventsPage />,
    isAuthenticated: true,
    children: [
      {
        path: "",
        element: <AllEventsDisplay />
      },
      {
        path: "create",
        element: <CreateEventForm />,
      },
      {
        path: "manage",
        element: <ManageEvents />,
      },
      {
        path: ":eventid",
        element: <EventInformationDisplay />,
      },
      {
        path: ":eventid/update",
        element: <UpdateEventForm />
      }
    ]
  },
  {
    path: "cart",
    element: <CartPage />,
    isAuthenticated: true,
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
        path: "orders",
        element: <OrdersDisplay />
      },
      {
        path: "settings",
        element: <ProfileSettingsDisplay />
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
  },
  {
    path: "logout",
    element: <LogoutPage />,
    isAuthenticated: true,
  }
];

export const generateProtectedRoutes = (isAuthenticated: boolean, role: AuthState['role']): ProtectedRouteObject[] => {
  const routesCopy = routes.map(route => ({ ...route })); // Copy the routes, to ensure we never modify the original state

  return routesCopy.map(route => {
    // Route requires admin **isAuthenticated=undefined routes will still be unaccessible if admin rights do not match
    if (route.adminOnly && role !== 'admin') {
      route.element = <ErrorPage customText='Unauthorised Access' />;
    }

    // route is only valid for (un)/authenticated users. **isAuthenticated=undefined is available to everyone
    if (route.isAuthenticated !== isAuthenticated && route.isAuthenticated !== undefined) {
      route.element = <ErrorPage customText={`Unauthorised Access - ${isAuthenticated ? "Logout" : "Login"} to Continue`} />;
    }

    // Return route (incl. route.element modifications)
    return route;
  });
}

export default generateProtectedRoutes;