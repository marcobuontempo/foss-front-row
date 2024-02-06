import { useEffect, useState } from 'react'
import './LogoutPage.css'
import { logout } from '@services/api'
import { onLogout } from '@services/authService'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify'

type Props = {}

export default function LogoutPage({ }: Props) {
  const [failed, setFailed] = useState(false);

  const navigate = useNavigate();

  const [params] = useSearchParams();

  const handleLogout = async () => {
    // Display different toast depending on whether token is expired, or user requested logout
    if (Boolean(params.get("expired")) === true) {
      toast.error("Session Expired. Logged Out!");
      onLogout();
      navigate("/");
    } else {
      await logout()
        .then(_response => {
          toast.success("Logged Out!")
          /* 
            only complete logout if endpoint is reached -
            (may prevent logout during backend downtime scenarios, 
            but ensures that state is always in sync without 
            accidentally leaving valid jwt in unused http-cookie)
          */
          onLogout();
          navigate("/");
        })
        .catch(_error => {
          setFailed(true);
        })
    }
  }

  useEffect(() => {
    handleLogout();
  }, []);

  return (
    <main className='LogoutPage mainpage'>
      {
        !failed ?
          <p>Logging out...</p>
          :
          <>
            <p>Failed to logout...</p>
            <button className='btn btn-info' type='button' onClick={handleLogout}>Try Again</button>
          </>
      }
    </main>
  )
}