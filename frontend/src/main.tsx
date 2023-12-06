/* Default imports */
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'

/* Custom CSS */
import './index.css'
import './reset.css'

/* Bootstrap */
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
