import { ChangeEvent, FormEvent, useState } from 'react'
import './CreateEventForm.css'
import { createEvent } from '@services/api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

type Props = {}

export default function CreateEventForm({ }: Props) {
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [venue, setVenue] = useState('');
  const [ticketQty, setTicketQty] = useState('');

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target?.value);
  };

  const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDate(e.target?.value);
  };

  const handleTimeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTime(e.target?.value);
  };

  const handleVenueChange = (e: ChangeEvent<HTMLInputElement>) => {
    setVenue(e.target?.value);
  };

  const handleTicketQtyChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTicketQty(e.target?.value);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Combine datetime for database, and avoid timezone differences
    const datetime = new Date(`${date}T${time}`).toISOString();

    // Form submission logic
    await createEvent({ title, datetime, venue, ticketQty: parseInt(ticketQty) })
      .then(_response => {
        // Display success
        toast.success("Event Created!");
        navigate("/events");
      })
      .catch(error => {
        const message = (error.response.status === 409) ?
          "Event Creation Failed! Event Title is already taken." :
          "Event Creation Failed! Please use valid values.";
        toast.error(message);
      })
  };

  return (
    <form className='CreateEventForm container-sm py-3 text-center' onSubmit={handleSubmit}>
      <h1>Create Event</h1>

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

      <div className='form-floating mb-3'>
        <input
          type="number"
          min={1}
          max={100}
          step={1}
          className="form-control"
          id="inputTicketQty"
          value={ticketQty}
          onChange={handleTicketQtyChange}
          placeholder='Ticket Quantity'
          required={true}
        />
        <label htmlFor="inputTicketQty" className="form-label">Ticket Quantity</label>
      </div>

      <button type="submit" className="btn btn-primary">Create</button>
    </form>
  )
}