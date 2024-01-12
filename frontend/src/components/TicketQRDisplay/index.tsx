import React, { FormEvent, useEffect, useRef, useState } from 'react'
import './TicketQRDisplay.css'
import QRCode from 'qrcode'
import { useAppSelector } from '@utils/useAppSelector';
import { selectUserId } from '@features/auth/authSlice';
import { UserOrdersResponse, generateTicketUID, getUserOrders } from '@services/api';
import * as htmlToImage from 'html-to-image';

type Props = {}

export default function TicketQRDisplay({ }: Props) {
  const userid = useAppSelector(selectUserId);

  const ref = useRef<HTMLTableElement>(null)

  const [orders, setOrders] = useState<UserOrdersResponse['data']>([]);
  const [selectedEvent, setSelectedEvent] = useState("");
  const [selectedTicket, setSelectedTicket] = useState("");
  const [qrUrl, setQrUrl] = useState<string | null>(null);
  const [ticketDetails, setTicketDetails] = useState({
    ticketid: "",
    eventid: "",
    seat: "",
    title: "",
    datetime: "",
    venue: "",
    owner: "",
  });

  const saveTicketAsImg = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (ref.current === null) return;

    htmlToImage.toPng(ref.current, { cacheBust: true, width: 500 })
      .then((dataUrl) => {
        const link = document.createElement('a')
        link.download = `ticket_${ticketDetails.ticketid}.png`
        link.href = dataUrl
        link.click()
      })
      .catch((err) => {
        console.log(err)
      })
  }

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

  const handleSelectEventChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedEvent(e.target.value);
    setSelectedTicket("");
  }

  const handleSelectTicketChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTicket(e.target.value);
  }

  const handleTicketSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // fetch a generated ticket uid from server
    const ticketUID =
      await generateTicketUID(selectedEvent, selectedTicket)
        .then(response => {
          return response.data.ticketUID;
        })
        .catch(error => {
          console.log(error)
        })

    if (ticketUID) {
      // get ticket information and save in state
      const [ticketid, eventid, seat, title, datetime, venue, owner] = ticketUID.split("::");
      setTicketDetails({
        ticketid,
        eventid,
        seat,
        title,
        datetime,
        venue,
        owner,
      })

      // generate the QR code and save in state
      await QRCode.toDataURL(ticketUID)
        .then(url => {
          setQrUrl(url)
        })
        .catch(error => {
          console.log(error)
        })
    }
  }

  if (qrUrl) {
    // display ticket if already generated
    const ticketDateTime = new Date(1735650000000);
    return (
      <div className="TicketQRDisplay d-flex flex-column align-items-center">
        <table className='table table-light text-center' style={{ maxWidth: '500px' }} ref={ref}>
          <tbody>
            <tr>
              <td colSpan={2}>
                <img src={qrUrl} />
              </td>
            </tr>
            <tr>
              <td>Event:</td>
              <td>{ticketDetails.title}</td>
            </tr>
            <tr>
              <td>Location:</td>
              <td>{ticketDetails.venue}</td>
            </tr>
            <tr>
              <td>Date:</td>
              <td>{ticketDateTime.toLocaleDateString()}</td>
            </tr>
            <tr>
              <td>Time:</td>
              <td>{ticketDateTime.toLocaleTimeString(undefined, { timeZoneName: 'short' })}</td>
            </tr>
            <tr>
              <td>Seat:</td>
              <td>{ticketDetails.seat}</td>
            </tr>
          </tbody>
        </table>
        <button type='button' onClick={saveTicketAsImg}>Save for Offline</button>
      </div>
    )
  } else {
    // otherwise, provide options to generate a ticket
    return (
      <div className='TicketQRDisplay'>
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