import React from 'react'
import './EventsPage.css'
import { Link, Outlet } from 'react-router-dom'

type Props = {}

export default function EventsPage({ }: Props) {
  return (
    <main className='EventsPage text-center'>
      <Link to={"create"}>Create Event</Link>
      <Outlet />
    </main>
  )
}