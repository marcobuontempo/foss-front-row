import React from 'react'
import './Header.css'
import { useAppSelector } from '@utils/useAppSelector'
import { selectIsAuthenticated, selectRole } from '@features/auth/authSlice'
import { Link } from 'react-router-dom'
import { onLogout } from '@services/authService'
import { useAppDispatch } from '@utils/useAppDispatch'
import { logout } from '@services/api'

type Props = {}

export default function Header({ }: Props) {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector(selectIsAuthenticated)
  const role = useAppSelector(selectRole)

  const handleLogout = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    logout()
      .then(response => {
        console.log(response);
        /* 
          only complete logout if endpoint is reached -
          (may prevent logout during downtime scenarios, 
          but ensures that state is always in sync without 
          accidentally leaving valid jwt in unused http-cookie) 
        */
        onLogout(dispatch);
      })
      .catch(error => {
        console.log(error);
      })
  }

  // ** admin can access 'user' links
  const navlist = [
    {
      to: '/login',
      text: 'Login',
      isAuthenticated: false,
    },
    {
      to: '/register',
      text: 'Register',
      isAuthenticated: false,
    },
    {
      to: '/profile',
      text: 'Profile',
      isAuthenticated: true,
    },
    {
      to: '/admin',
      text: 'Admin',
      isAuthenticated: true,
      adminOnly: true,
    },
    {
      to: '/',
      text: 'Logout',
      onClick: handleLogout,
      isAuthenticated: true,
    },
  ];

  return (
    <nav className="Header navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to={'/'}>
          <img src="/vite.svg" alt="" width="30" height="24" className="d-inline-block align-text-top" />
          TicketEcomm
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav gap-3">
            {
              // Conditionally render the navlist
              navlist.map(navItem => {
                if (navItem.adminOnly === true && role !== 'admin') return null;  // skip rendering admin navlinks if unauthorised
                if (isAuthenticated !== navItem.isAuthenticated) return null;  // skip rendering navlinks that don't match isAuthenticated state (e.g. 'Login' when already logged in)
                return (
                  <li className="nav-item" key={navItem.text}>
                    <Link className="btn btn-outline-success px-5" type="button" to={navItem.to} onClick={navItem.onClick}>{navItem.text}</Link>
                  </li>
                )
              })
            }
          </ul>
        </div>
      </div>
    </nav>
  )
}

