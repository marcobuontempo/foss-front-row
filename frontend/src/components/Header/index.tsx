import React, { useState } from 'react'
import './Header.css'
import { useAppSelector } from '@utils/useAppSelector'
import { selectAuth } from '@features/auth/authSlice'
import { Link } from 'react-router-dom'
import generateProtectedRoutes from '@router/routes'

type Props = {}

export default function Header({ }: Props) {
  const { isAuthenticated, role } = useAppSelector(selectAuth);

  const [confirmLogout, setConfirmLogout] = useState(false);

  // get nav list from routes
  const navlist = generateProtectedRoutes(isAuthenticated, role)

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    setConfirmLogout(false);
  }

  const handleConfirmLogout = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!confirmLogout) {
      e.preventDefault();
      setConfirmLogout(true);
    }
  }

  return (
    <nav className="Header navbar navbar-expand-lg">
      <div className="container-fluid">
        <Link className='Header__logo navbar-brand' to={'/'}>
          <img src="/logo-no-background.svg" alt="logo" className="d-inline-block align-text-top" />
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
                  <li className="nav-item" key={navItem.path}>
                    <Link
                      className="Header__nav_button btn px-5"
                      type="button"
                      to={`/${navItem.path}`}
                      onClick={navItem.path === 'logout' ? handleConfirmLogout : handleLinkClick}>
                      {(navItem.path === 'logout' && confirmLogout) ? "confirm?" : navItem.path}
                    </Link>
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

