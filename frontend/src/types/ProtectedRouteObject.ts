import { RouteObject } from 'react-router-dom';

export type ProtectedRouteObject =
  RouteObject &
  {
    isAuthenticated?: boolean,
    adminOnly?: boolean,
  }
