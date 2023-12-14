import store from '../store'
import { handleLoginSuccess, handleLogout } from '@services/authService';


export const initialiseAuthDataFromStorage = (): void => {
  // Fetch data from localStorage on page load
  const storedAuthData = localStorage.getItem('auth');

  // If valid data exists, dispatch setAuthorised action to update the Redux store
  if (storedAuthData) {
    const authData = JSON.parse(storedAuthData);
    if (authData.userid && authData.role) {
      handleLoginSuccess(authData, store.dispatch);
    } else {
      // if invalid, clear any localstorage and redux information related to auth
      handleLogout(store.dispatch);
    }
  }
}