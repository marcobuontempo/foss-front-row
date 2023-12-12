import React from 'react'
import './Header.css'
import { Link } from 'react-router-dom'

type Props = {}

export default function Header({ }: Props) {
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
            <li className="nav-item">
              <Link className="btn btn-outline-success px-5" type="button" to={'/login'}>Login</Link>
            </li>
            <li className="nav-item">
              <Link className="btn btn-outline-success px-5" type="button" to={'/register'}>Register</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

