import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import './UpdateEventForm.css'
import { editEvent, getEvent } from '@services/api';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

type Props = {}

export default function UpdateEventForm({ }: Props) {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [venue, setVenue] = useState('');
  const [confirmSubmit, setConfirmSubmit] = useState(false);

  // Get the 'eventid' parameter from the URL
  const { eventid } = useParams();

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target?.value);
    setConfirmSubmit(false);
  };

  const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDate(e.target?.value);
    setConfirmSubmit(false);
  };

  const handleTimeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTime(e.target?.value);
    setConfirmSubmit(false);
  };

  const handleVenueChange = (e: ChangeEvent<HTMLInputElement>) => {
    setVenue(e.target?.value);
    setConfirmSubmit(false);
  };


  const fetchEvent = async () => {
    if (eventid) {
      await getEvent(eventid)
        .then(response => {
          // console.log(response.data)
          const datetime = new Date(response.data.date)

          // Format date as "YYYY-MM-DD", in local timezone
          const year = datetime.getFullYear();
          const month = String(datetime.getMonth() + 1).padStart(2, '0'); // Months are zero-based
          const day = String(datetime.getDate()).padStart(2, '0');
          const localeDate = `${year}-${month}-${day}`;

          // Format time to local timezone
          const localeTime = datetime.toLocaleTimeString();

          // Set values
          setTitle(response.data.title)
          setDate(localeDate)
          setTime(localeTime)
          setVenue(response.data.venue)
          return response.data
        })
        .catch(error => {
          console.log(error)
        })
    }
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!confirmSubmit) {
      setConfirmSubmit(true);
      return;
    }

    // Form submission logic
    if (eventid) {
      await editEvent(eventid, { title, date, venue })
        .then(_response => {
          toast.success("Event Updated!");
        })
        .catch(error => {
          const message = (error.response.status === 409) ?
            "Event Creation Failed! Event Title is already taken." :
            "Event Creation Failed! Please use valid values.";
          toast.error(message);
        })
    }

    // Reset confirmation
    setConfirmSubmit(false);
  };

  useEffect(() => {
    fetchEvent();
  }, [])

  return (
    <form className='UpdateEventForm container-sm py-3 text-center' onSubmit={handleSubmit}>
      <h1>Update Event</h1>

      <div className='form-floating mb-3'>
        <input
          type="text"
          id="inputTitle"
          className="form-control"
          value={title}
          onChange={handleTitleChange}
          placeholder='Title'
          required={true}
        />
        <label htmlFor="inputTitle" className="form-label">Title</label>
      </div>

      <div className='form-floating mb-3'>
        <input
          type="date"
          className="form-control"
          id="inputDate"
          value={date}
          onChange={handleDateChange}
          placeholder='Date'
          required={true}
        />
        <label htmlFor="inputDate" className="form-label">Date</label>
      </div>

      <div className='form-floating mb-3'>
        <input
          type="time"
          className="form-control"
          id="inputTime"
          value={time}
          onChange={handleTimeChange}
          placeholder='Time'
          required={true}
        />
        <label htmlFor="inputTime" className="form-label">Time</label>
      </div>

      <div className='form-floating mb-3'>
        <input
          type="text"
          className="form-control"
          id="inputVenue"
          value={venue}
          onChange={handleVenueChange}
          placeholder='Venue'
          required={true}
        />
        <label htmlFor="inputVenue" className="form-label">Venue</label>
      </div>

      <button type="submit" className="btn btn-primary">{confirmSubmit ? "Confirm?" : "Update Event"}</button>
    </form>
  )
}