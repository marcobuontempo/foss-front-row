// Constants for localStorage keys
const USER_ID_KEY = 'user-id';
const USER_ROLE_KEY = 'user-role';

// Handle successful login
export const handleLoginSuccess = (loginResponse: { id: string; role: string; }): void => {
  // Store the user information in localStorage
  localStorage.setItem(USER_ID_KEY, loginResponse.id);
  localStorage.setItem(USER_ROLE_KEY, loginResponse.role);
};

// Handle logout
export const handleLogout = (): void => {
  // Clear the user information from localStorage
  localStorage.removeItem(USER_ID_KEY);
  localStorage.removeItem(USER_ROLE_KEY);
};

// Check if the user is authenticated
export const isAuthenticated = (): boolean => {
  // TODO
  return true;
};