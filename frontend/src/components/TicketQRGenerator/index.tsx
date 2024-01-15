import React, { FormEvent, useEffect, useState } from 'react'
import './TicketQRGenerator.css'
import QRCode from 'qrcode'
import { useAppSelector } from '@utils/useAppSelector';
import { selectUserId } from '@features/auth/authSlice';
import { EventResponse, TicketResponse, UserOrdersResponse, generateTicketUID, getUserOrders } from '@services/api';
import TicketQRDisplay from '@components/TicketQRDisplay';

type Props = {}

type EventDetails = EventResponse['data'] & { tickets: TicketResponse['data'][] };

export const defaultTicketDetails = {
  uid: "",
  id: "",
  event: "",
  title: "",
  venue: "",
  unixdatetime: 0,
  seat: "",
}


export default function TicketQRGenerator({ }: Props) {
  const userid = useAppSelector(selectUserId);

  const [orders, setOrders] = useState<UserOrdersResponse['data']>([]);
  const [selectedEvent, setSelectedEvent] = useState("");
  const [selectedTicket, setSelectedTicket] = useState("");
  const [qrUrl, setQrUrl] = useState<string | null>(null);
  const [ticketDetails, setTicketDetails] = useState(defaultTicketDetails);


  const groupEvents = () => {
    const events: EventDetails[] = [];
    orders.forEach(order => {
      const existingEvent = events.find(event => event._id === order.event._id);
      if (existingEvent) {
        existingEvent.tickets.push(...order.tickets);
      } else {
        events.push({
          ...order.event,
          tickets: [...order.tickets],  // create copy of tickets, instead of reference to each ticket object
        })
      }
    })
    return events;
  }

  const groupEventTickets = () => {
    const event = groupEvents().find(event => event._id === selectedEvent);
    return event ? event.tickets : [];
  }

  useEffect(() => {
    // fetch user orders
    if (userid) {
      getUserOrders(userid)
        .then(response => {
          setOrders(response.data)
        })
        .catch(error => {
          console.log(error)
        })
    }
  }, [])

  const handleClearTicket = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setQrUrl("");
    setTicketDetails(defaultTicketDetails);
  }

  const handleSelectEventChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedEvent(e.target.value);
    setSelectedTicket("");
  }

  const handleSelectTicketChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTicket(e.target.value);
  }

  const handleTicketSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // fetch a generated ticket uid & info from server
    const ticketData =
      await generateTicketUID(selectedEvent, selectedTicket)
        .then(response => {
          const newTicketDetails = {
            ...response.data.info,
            uid: response.data.uid,
          }
          setTicketDetails(newTicketDetails)
          return newTicketDetails;
        })
        .catch(error => {
          console.log(error)
        })

    // generate the QR code and save in state
    await QRCode.toDataURL(JSON.stringify(ticketData), {
      errorCorrectionLevel: 'quartile',
      scale: 10,
    })
      .then(url => {
        setQrUrl(url)
      })
      .catch(error => {
        console.log(error)
      })
  }

  if (qrUrl) {
    // display ticket if already generated
    return <TicketQRDisplay ticket={ticketDetails} qrUrl={qrUrl} handleClearTicket={handleClearTicket} />
  } else {
    // otherwise, provide options to generate a ticket
    return (
      <div className='TicketQRGenerator'>
        {
          orders.length === 0
            ?
            "No tickets to display."
            :
            <form onSubmit={handleTicketSubmit}>
              <label htmlFor='event'>Event</label>
              <select name='event' value={selectedEvent} onChange={handleSelectEventChange}>
                <option value="" disabled>select event...</option>
                {
                  groupEvents()
                    .map(event => <option value={event._id} key={event._id}>{event.title}</option>)
                }
              </select>

              <label htmlFor='ticket'>Ticket</label>
              <select name='ticket' value={selectedTicket} onChange={handleSelectTicketChange}>
                <option value="" disabled>select ticket...</option>
                {
                  groupEventTickets()
                    .map(ticket => <option value={ticket._id} key={ticket._id}>{ticket._id} | ({ticket.seat})</option>)
                }
              </select>
              <button className='btn btn-info' type='submit'>Generate Ticket</button>
            </form>
        }
      </div>
    )
  }
}