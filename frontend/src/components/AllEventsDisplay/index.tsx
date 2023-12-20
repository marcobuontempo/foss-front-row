import React, { useEffect, useState } from 'react'
import './AllEventsDisplay.css'
import { EventsResponse, getAllEvents } from '@services/api'

type Props = {}

export default function AllEventsDisplay({ }: Props) {
  const [events, setEvents] = useState<EventsResponse['data'][]>([])

  const fetchEvents = async () => {
    getAllEvents()
      .then(response => {
        // console.log(response)
        setEvents(response.data)
      })
      .catch(error => {
        console.log(error);
      })
  }

  useEffect(() => {
    fetchEvents();
  }, [])

  return (
    <div className='AllEventsDisplay'>
      <h1>Events:</h1>
      <ul>
        {
          events.map(ev => {
            return (
              <li key={ev.title}>
                <table className='table table-bordered' style={{ maxWidth: '500px' }}>
                  <tbody>
                    <tr>
                      <td>Title:</td>
                      <td>{ev.title}</td>
                    </tr>
                    <tr>
                      <td>Venue:</td>
                      <td>{ev.venue}</td>
                    </tr>
                    <tr>
                      <td>Date:</td>
                      <td>{ev.date}</td>
                    </tr>
                    <tr>
                      <td colSpan={2}>
                        <button>View</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}