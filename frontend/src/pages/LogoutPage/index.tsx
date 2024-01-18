import React, { useEffect, useState } from 'react'
import './LogoutPage.css'
import { logout } from '@services/api'
import { onLogout } from '@services/authService'
import { useNavigate } from 'react-router-dom'
import SuccessModal from '@components/SuccessModal'

type Props = {}

export default function LogoutPage({ }: Props) {
  const [success, setSuccess] = useState<boolean | null>(null);

  const navigate = useNavigate();

  const handleLogout = async () => {
    setSuccess(null); // reset state to null (i.e. requesting logout)
    await logout()
      .then(response => {
        setSuccess(true);
        // delay redirect by 2.5s
        setTimeout(() => {
          /* 
            only complete logout if endpoint is reached -
            (may prevent logout during backend downtime scenarios, 
            but ensures that state is always in sync without 
            accidentally leaving valid jwt in unused http-cookie)
          */
          onLogout();
          navigate("/");
        }, 2500);
      })
      .catch(error => {
        setSuccess(false);
      })
  }

  useEffect(() => {
    handleLogout();
  }, []);

  return (
    <main className='LogoutPage mainpage'>
      {
        success === null ?
          <>
            Logging out...
          </>
          :
          success === true ?
            <SuccessModal isOpen={success}>
              Log Out Successful!<br />
              Redirecting to home...
            </SuccessModal>
            :
            <>
              Failed to logout...<br />
              <button type='button' onClick={handleLogout}>Try Again</button>
            </>
      }
    </main>
  )
}