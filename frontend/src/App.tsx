import './App.css'
import { Outlet } from 'react-router-dom'
import Header from '@components/Header'
import Footer from '@components/Footer'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <Header />
      <Outlet />
      <ToastContainer
        position='bottom-right'
      />
      <Footer />
    </>
  )
}

export default App
