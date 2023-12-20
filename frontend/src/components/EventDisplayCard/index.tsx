import { EventResponse } from '@services/api';
import { useNavigate } from 'react-router-dom'
import React from 'react'
import './EventDisplayCard.css'

type Props = {
  eventData: EventResponse['data'];
}

export default function EventDisplayCard({ eventData }: Props) {
  const navigate = useNavigate();

  const handleViewEventOnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    navigate(eventData._id)
  }

  return (
    <li className='EventDisplayCard list-group-item d-flex align-items-center justify-content-center'>
      <table className='table table-bordered' style={{ maxWidth: '500px' }}>
        <tbody>
          <tr>
            <td colSpan={2}>{eventData.title}</td>
          </tr>
          <tr>
            <td>Venue:</td>
            <td>{eventData.venue}</td>
          </tr>
          <tr>
            <td>Date:</td>
            <td>{eventData.date}</td>
          </tr>
          <tr>
            <td colSpan={2}>
              <button className='btn btn-success' onClick={handleViewEventOnClick}>View Event</button>
            </td>
          </tr>
        </tbody>
      </table>
    </li>
  )
}