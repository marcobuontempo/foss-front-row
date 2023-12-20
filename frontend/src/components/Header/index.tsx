import React from 'react'
import './Header.css'
import { useAppSelector } from '@utils/useAppSelector'
import { selectIsAuthenticated, selectRole } from '@features/auth/authSlice'
import { Link } from 'react-router-dom'
import generateProtectedRoutes from '@router/routes'

type Props = {}

export default function Header({ }: Props) {
  const isAuthenticated = useAppSelector(selectIsAuthenticated)
  const role = useAppSelector(selectRole)

  // get nav list from routes
  const navlist = generateProtectedRoutes(isAuthenticated, role)

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
                  <li className="nav-item" key={navItem.path}>
                    <Link className="btn btn-outline-success px-5" type="button" to={`/${navItem.path}`} onClick={undefined}>{navItem.path}</Link>
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

