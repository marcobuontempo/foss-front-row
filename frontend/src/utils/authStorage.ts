import store from '../store'
import { onLoginSuccess, onLogout } from '@services/authService';


export const initialiseAuthDataFromStorage = (): void => {
  // Fetch data from localStorage on page load
  const storedAuthData = localStorage.getItem('auth');

  // If valid data exists, update redux store
  if (storedAuthData) {
    const authData = JSON.parse(storedAuthData);
    if (authData.userid && authData.role) {
      onLoginSuccess(authData, store.dispatch);
    } else {
      // if invalid, clear any localstorage and redux information related to auth
      onLogout(store.dispatch);
    }
  }
}