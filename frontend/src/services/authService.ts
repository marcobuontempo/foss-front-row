import { setAuthorised, setUnauthorised } from '@features/auth/authSlice';
import { Dispatch } from '@reduxjs/toolkit';

// Constants for localStorage keys
const AUTH_KEY = 'auth';

// Handle successful login
export const handleLoginSuccess = (loginResponse: { id: string; role: string; }, dispatch: Dispatch): void => {
  const authData = {
    userid: loginResponse.id,
    role: loginResponse.role,
  }
  // Store the user information in localStorage
  localStorage.setItem(AUTH_KEY, JSON.stringify(authData));

  // Update Redux auth state
  dispatch(setAuthorised(authData));
};

// Handle logout
export const handleLogout = (dispatch: Dispatch): void => {
  // Clear the user information from localStorage
  localStorage.removeItem(AUTH_KEY);

  // Reset Redux auth state to default
  dispatch(setUnauthorised());
};

// Check if the user is authenticated
export const isAuthenticated = (): boolean => {
  // TODO
  return true;
};