import { setAuthorised, setUnauthorised } from '@features/auth/authSlice';
import { Dispatch } from '@reduxjs/toolkit';

// Constants for localStorage keys
const USER_ID_KEY = 'user-id';
const USER_ROLE_KEY = 'user-role';

// Handle successful login
export const handleLoginSuccess = (loginResponse: { id: string; role: string; }, dispatch: Dispatch): void => {
  // Store the user information in localStorage
  localStorage.setItem(USER_ID_KEY, loginResponse.id);
  localStorage.setItem(USER_ROLE_KEY, loginResponse.role);

  // Update Redux auth state
  dispatch(setAuthorised());
};

// Handle logout
export const handleLogout = (dispatch: Dispatch): void => {
  // Clear the user information from localStorage
  localStorage.removeItem(USER_ID_KEY);
  localStorage.removeItem(USER_ROLE_KEY);

  // Reset Redux auth state to default
  dispatch(setUnauthorised());
};

// Check if the user is authenticated
export const isAuthenticated = (): boolean => {
  // TODO
  return true;
};