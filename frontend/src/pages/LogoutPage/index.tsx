import React, { useEffect } from 'react'
import './LogoutPage.css'
import { logout } from '@services/api'
import { onLogout } from '@services/authService'
import { useNavigate } from 'react-router-dom'

type Props = {}

export default function LogoutPage({ }: Props) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout()
      .then(response => {
        // console.log(response);
        /* 
          only complete logout if endpoint is reached -
          (may prevent logout during backend downtime scenarios, 
          but ensures that state is always in sync without 
          accidentally leaving valid jwt in unused http-cookie)
        */
        navigate("/");
        onLogout();
      })
      .catch(error => {
        // console.log(error);
      })
  }

  useEffect(() => {
    handleLogout();
  }, []);

  return (
    <main className='LogoutPage'>
      Successfully Logged Out.
    </main>
  )
}