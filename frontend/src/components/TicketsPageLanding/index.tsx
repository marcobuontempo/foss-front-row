import React from 'react'
import './TicketsPageLanding.css'
import { Link } from 'react-router-dom';

type Props = {}

export default function TicketsPageLanding({ }: Props) {
  return (
    <div className='TicketsPageLanding d-flex w-100 flex-column align-items-center'>
      I am a...
      <Link to={"display"}>
        <button className='btn btn-info' type='button'>Ticket Holder: Show my tickets</button>
      </Link>
      <Link to={"scan"}>
        <button className='btn btn-info' type='button'>Event Owner: Scan customer tickets</button>
      </Link>
    </div>
  )
}