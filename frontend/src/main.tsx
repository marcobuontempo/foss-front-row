/* Default imports */
import React from 'react'
import ReactDOM from 'react-dom/client'

/* Custom CSS */
import './index.css'
import './reset.css'

/* Bootstrap */
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

/* Redux */
import { Provider } from 'react-redux'
import store from './store.ts'

/* Configs */
import '@utils/axios-config.ts'

/* Other */
import { initialiseAuthDataFromStorage } from '@utils/authStorage.ts'
import ProtectedRouterProvider from '@router/ProtectedRouterProvider'
import { initialiseCartDataFromStorage } from '@utils/cartStorage.ts'


// Initialise data from localStorage
initialiseAuthDataFromStorage();
initialiseCartDataFromStorage();


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ProtectedRouterProvider />
    </Provider>
  </React.StrictMode>,
)
