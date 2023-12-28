import React, { useEffect, useState } from 'react'
import './AllEventsDisplay.css'
import { EventResponse, getAllEvents } from '@services/api'
import EventDisplayCard from '@components/EventDisplayCard'

type Props = {}

export default function AllEventsDisplay({ }: Props) {
  const [events, setEvents] = useState<EventResponse['data'][]>([])

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
      <ul className='list-group w-100'>
        {
          events.map(ev => <EventDisplayCard key={ev.title} eventData={ev} />)
        }
      </ul>
    </div>
  )
}