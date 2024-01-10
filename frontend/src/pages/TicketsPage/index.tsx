import React from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import './TicketsPage.css'

type Props = {}

export default function TicketsPage({ }: Props) {

  const currentRoute = useLocation().pathname.split("/").slice(-1)[0]

  return (
    <div className='TicketsPage'>
      {/* Nav Links */}
      <ul className="nav nav-tabs justify-content-center">
        <li className="nav-item">
          <Link
            className={`nav-link ${currentRoute === "display" && "active"}`}
            to={"display"}>
            My Tickets
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className={`nav-link ${currentRoute === "scan" && "active"}`}
            to={"scan"}>
            Scan Tickets
          </Link>
        </li>
      </ul>

      {/* Content */}
      <Outlet />
    </div>
  )
}