import { setAuthenticated, setUnauthenticated } from '@features/auth/authSlice';
import { Dispatch } from '@reduxjs/toolkit';

// Constants for localStorage keys
const AUTH_KEY = 'auth';

// Handle successful login
export const onLoginSuccess = (loginResponse: { id?: string; userid?: string; role: string; }, dispatch: Dispatch): void => {
  const authData = {
    userid: loginResponse.id || loginResponse.userid,
    role: loginResponse.role,
  }
  // Store the user information in localStorage
  localStorage.setItem(AUTH_KEY, JSON.stringify(authData));

  // Update Redux auth state
  dispatch(setAuthenticated(authData));
};

// Handle logout
export const onLogout = (dispatch: Dispatch): void => {
  // Clear the user information from localStorage
  localStorage.removeItem(AUTH_KEY);

  // Reset Redux auth state to default
  dispatch(setUnauthenticated());
};