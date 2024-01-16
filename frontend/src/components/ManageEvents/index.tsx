import React, { useEffect, useState } from 'react'
import './ManageEvents.css'
import { EventResponse, getUserEvents } from '@services/api'
import { useAppSelector } from '@utils/useAppSelector';
import { selectAuth } from '@features/auth/authSlice';
import EventDisplayCard from '@components/EventDisplayCard';

type Props = {}

export default function ManageEvents({ }: Props) {
  const { userid } = useAppSelector(selectAuth);

  const [events, setEvents] = useState<EventResponse['data'][]>([])

  const fetchUserEvents = async () => {
    if (userid) {
      await getUserEvents(userid)
        .then(response => {
          // console.log(response)
          setEvents(response.data)
        })
        .catch(error => {
          console.log(error);
        })
    }
  }

  useEffect(() => {
    fetchUserEvents();
  }, [])

  return (
    <div className='ManageEvents'>
      {events.map(event => <EventDisplayCard key={event.title} eventData={event} />)}
    </div>
  )
}