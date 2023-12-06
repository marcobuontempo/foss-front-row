import React from 'react'

type Props = {}

export default function Navbar({ }: Props) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          <img src="/vite.svg" alt="" width="30" height="24" className="d-inline-block align-text-top" />
          TicketEcomm
        </a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav gap-3">
            <li className="nav-item">
              <button className="btn btn-outline-success px-5" type="button">Login</button>
            </li>
            <li className="nav-item">
              <button className="btn btn-outline-success px-5" type="button">Register</button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

