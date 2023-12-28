import React, { ChangeEvent, FormEvent, useState } from 'react'
import './CreateEventForm.css'
import { createEvent } from '@services/api';

type Props = {}

export default function CreateEventForm({ }: Props) {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [venue, setVenue] = useState('');
  const [ticketQty, setTicketQty] = useState('');

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target?.value);
  };

  const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDate(e.target?.value);
  };

  const handleVenueChange = (e: ChangeEvent<HTMLInputElement>) => {
    setVenue(e.target?.value);
  };

  const handleTicketQtyChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTicketQty(e.target?.value);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Form submission logic
    await createEvent({ title, date, venue, ticketQty: parseInt(ticketQty) })
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      })
  };

  return (
    <form className='CreaateEventForm container-sm py-3 text-center' onSubmit={handleSubmit}>
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