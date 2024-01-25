import TicketsList from '@components/TicketsList';
import { selectAuth } from '@features/auth/authSlice';
import { AllTicketsResponse, EventResponse, deleteEvent, getEvent, getEventTickets } from '@services/api';
import { useAppSelector } from '@utils/useAppSelector';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

type Props = {}

export default function EventInformationDisplay({ }: Props) {
  const [eventData, setEventData] = useState<EventResponse['data'] | null>(null)
  const [tickets, setTickets] = useState<AllTicketsResponse['data']>([]);
  const [isOwner, setIsOwner] = useState<boolean>(false);
  const [confirmDelete, setConfirmDelete] = useState<boolean>(false);

  const navigate = useNavigate()

  // Get the 'eventid' parameter from the URL
  const { eventid } = useParams();

  // Get 'userid'
  const { userid } = useAppSelector(selectAuth);

  const fetchEvent = async () => {
    if (eventid) {
      await getEvent(eventid)
        .then(response => {
          // console.log(response.data)
          setEventData(response.data)
          setIsOwner(response.data.owner === userid)
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

  const handleDeleteEvent = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!confirmDelete) {
      setConfirmDelete(true);
      return;
    }
    if (eventid) {
      await deleteEvent(eventid)
        .then(response => {
          toast.success("Event Deleted!");
          navigate("/events");
        })
        .catch(error => {
          toast.error("Event Deletion Failed!");
        })
    }
  }

  const handleEditEvent = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    navigate(`/events/${eventid}/update`)
  }

  useEffect(() => {
    fetchEvent();
  }, [])

  if (eventData === null) return null;

  return (
    <div className='EventInformationDisplay'>
      <h1>{eventData.title}</h1>
      <p>Venue: {eventData.venue}</p>
      <p>Date: {new Date(eventData.date).toLocaleString(undefined, { timeZoneName: "short" })}</p>

      <TicketsList tickets={tickets} />

      {
        isOwner &&
        <div>
          <h4>Owner Controls</h4>
          <button className='btn btn-info' type='button' onClick={handleEditEvent}>Edit Event</button>
          <button className='btn btn-danger' type='button' onClick={handleDeleteEvent}>{confirmDelete ? "Confirm Deletion?" : "Delete Event"}</button>
        </div>
      }
    </div>
  )
}