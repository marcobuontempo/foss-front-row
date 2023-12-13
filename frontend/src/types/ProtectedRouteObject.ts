import { RouteObject } from 'react-router-dom';
import { Roles } from './Roles';

export type ProtectedRouteObject =
  RouteObject &
  {
    isAuthenticated?: boolean,
    roleAccess?: Roles
  }
