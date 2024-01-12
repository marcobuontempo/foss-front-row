import React, { useRef } from 'react'
import * as htmlToImage from 'html-to-image';

type Props = {
  qrUrl: string;
  ticket: {
    ticketid: string,
    eventid: string,
    seat: string,
    title: string,
    datetime: string,
    venue: string,
    owner: string,
  }
}

export default function TicketQRDisplay({ qrUrl, ticket }: Props) {
  const ref = useRef<HTMLTableElement>(null)

  const ticketDateTime = new Date(1735650000000);

  const saveTicketAsImg = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (ref.current === null) return;

    htmlToImage.toPng(ref.current, { cacheBust: true, width: 500 })
      .then((dataUrl) => {
        const link = document.createElement('a')
        link.download = `ticket_${ticket.ticketid}.png`
        link.href = dataUrl
        link.click()
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <div className="TicketQRGenerator d-flex flex-column align-items-center">
      <table className='table table-light text-center' style={{ maxWidth: '500px' }} ref={ref}>
        <tbody>
          <tr>
            <td colSpan={2}>
              <img src={qrUrl} />
            </td>
          </tr>
          <tr>
            <td>Event:</td>
            <td>{ticket.title}</td>
          </tr>
          <tr>
            <td>Location:</td>
            <td>{ticket.venue}</td>
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
            <td>{ticket.seat}</td>
          </tr>
        </tbody>
      </table>
      <button type='button' onClick={saveTicketAsImg}>Save for Offline</button>
    </div>
  )
}