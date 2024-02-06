import './EventsPage.css'
import { Link, Outlet, useLocation } from 'react-router-dom'

type Props = {}

export default function EventsPage({ }: Props) {
  const currentRoute = useLocation().pathname.split("/").slice(-1)[0]


  return (
    <main className='EventsPage mainpage text-center'>

      {/* Nav Links */}
      <ul className="nav nav-tabs justify-content-center">
        <li className="nav-item">
          <Link
            className={`nav-link ${currentRoute === "events" && "active"}`}
            to={""}>
            What's On
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className={`nav-link ${currentRoute === "manage" && "active"}`}
            to={"manage"}>
            Manage Events
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className={`nav-link ${currentRoute === "create" && "active"}`}
            to={"create"}>
            Create Event
          </Link>
        </li>
      </ul>

      {/* Content */}
      <Outlet />
    </main>
  )
}