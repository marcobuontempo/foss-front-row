import React, { useEffect, useState } from 'react'
import './AllEventsDisplay.css'
import { EventResponse, getAllEvents } from '@services/api'
import EventDisplayCard from '@components/EventDisplayCard'

type Props = {}

export default function AllEventsDisplay({ }: Props) {
  const [events, setEvents] = useState<EventResponse['data'][]>([])
  const [searchNameFilter, setSearchNameFilter] = useState<string>("")

  const fetchEvents = async () => {
    await getAllEvents()
      .then(response => {
        // console.log(response)
        setEvents(response.data)
      })
      .catch(error => {
        console.log(error);
      })
  }

  const handleSearchFilterOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSearchNameFilter(e.target.value);
  }

  const filterEvents = (events: EventResponse['data'][]) => {
    return events.filter(event => {
      return event.title
        .toLowerCase()
        .includes(searchNameFilter.toLowerCase())
    })
  }

  useEffect(() => {
    fetchEvents();
  }, [])

  return (
    <div className='AllEventsDisplay'>
      <ul className='list-group w-100'>
        <form onSubmit={e => e.preventDefault()}>
          <label htmlFor='search-name-filter'>Search Events:</label>
          <input id='search-name-filter' type='text' value={searchNameFilter} onChange={handleSearchFilterOnChange} />
        </form>
        {
          filterEvents(events).map(event => <EventDisplayCard key={event.title} eventData={event} />)
        }
      </ul>
    </div>
  )
}