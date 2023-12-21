import TicketDisplayCard from '@components/TicketDisplayCard';
import { AllTicketsResponse, EventResponse, getEvent, getEventTickets } from '@services/api';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

type Props = {}

export default function EventInformationDisplay({ }: Props) {
  const [eventData, setEventData] = useState<EventResponse['data'] | null>(null)
  const [tickets, setTickets] = useState<AllTicketsResponse['data']>([]);

  // Get the 'eventid' parameter from the URL
  const { eventid } = useParams();

  const fetchEvent = async () => {
    if (eventid) {
      await getEvent(eventid)
        .then(response => {
          // console.log(response.data)
          setEventData(response.data)
          return response.data
        })
        .catch(error => {
          console.log(error)
        })

      await getEventTickets(eventid)
        .then(response => {
          // console.log(response.data)
          setTickets(response.data)
        })
    }
  }

  useEffect(() => {
    fetchEvent();
  }, [])

  if (eventData === null) return null;

  return (
    <div className='EventInformationDisplay'>
      <h1>{eventData.title}</h1>
      <p>Venue: {eventData.venue}</p>
      <p>Date: {eventData.date}</p>

      <table className='table'>
        <thead>
          <tr className='table-light'>
            <th scope='col'>Seat</th>
            <th scope='col'>Price</th>
            <th scope='col'>Purchase</th>
          </tr>
        </thead>
        <tbody>
          {
            tickets
              .sort((a, b) => (a.available === b.available) ? a.price - b.price : a.available ? -1 : 1) // sort available tickets first
              .map(ticket => <TicketDisplayCard key={ticket._id} ticketData={ticket} />)
          }
        </tbody>
      </table>

    </div>
  )
}