import React, { FormEvent, useEffect, useState } from 'react'
import './TicketQRGenerator.css'
import QRCode from 'qrcode'
import { useAppSelector } from '@utils/useAppSelector';
import { selectUserId } from '@features/auth/authSlice';
import { UserOrdersResponse, generateTicketUID, getUserOrders } from '@services/api';
import TicketQRDisplay from '@components/TicketQRDisplay';

type Props = {}

const defaultTicketDetails = {
  uid: "",
  eventid: "",
  ticketid: "",
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

  useEffect(() => {
    if (userid) {
      getUserOrders(userid)
        .then(response => {
          console.log(response)
          setOrders(response.data)
        })
        .catch(error => {
          console.log(error)
        })
    }
  }, [])

  const handleClearTicket = () => {
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
    await QRCode.toDataURL(JSON.stringify(ticketData))
      .then(url => {
        setQrUrl(url)
      })
      .catch(error => {
        console.log(error)
      })
  }

  if (qrUrl) {
    // display ticket if already generated
    return <TicketQRDisplay qrUrl={qrUrl} ticket={ticketDetails} handleClearTicket={handleClearTicket} />
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
                  [...new Set(orders.map(order => order.eventid))]
                    .map(event => <option value={event._id} key={event._id}>{event.title}</option>)
                }
              </select>

              <label htmlFor='ticket'>Ticket</label>
              <select name='ticket' value={selectedTicket} onChange={handleSelectTicketChange}>
                <option value="" disabled>select ticket...</option>
                {
                  orders
                    .filter(order => order.eventid._id === selectedEvent)
                    .flatMap(order => order.tickets)
                    .map(ticket => <option value={ticket._id} key={ticket._id}>{ticket._id} | ({ticket.seat})</option>)
                }
              </select>
              <button type='submit'>Generate Ticket</button>
            </form>
        }
      </div>
    )
  }
}