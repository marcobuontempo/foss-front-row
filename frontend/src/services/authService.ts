import { setAuthenticated, setUnauthenticated } from '@features/auth/authSlice';
import store from '../store';

// Constants for localStorage keys
const AUTH_KEY = 'auth';

// Handle successful login
export const onLoginSuccess = (loginResponse: { id?: string | null; userid?: string; role: 'user' | 'admin'; }): void => {
  const authData = {
    userid: loginResponse?.id || loginResponse?.userid || null,
    role: loginResponse.role,
  }

  // Store the user information in localStorage
  localStorage.setItem(AUTH_KEY, JSON.stringify(authData));

  // Update Redux auth state
  store.dispatch(setAuthenticated(authData));
};

// Handle logout
export const onLogout = (): void => {
  // Clear the user information from localStorage
  localStorage.removeItem(AUTH_KEY);

  // Reset Redux auth state to default
  store.dispatch(setUnauthenticated());
};