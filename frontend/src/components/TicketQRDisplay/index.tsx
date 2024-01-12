import React, { useRef } from 'react'
import * as htmlToImage from 'html-to-image';

type Props = {
  ticket: {
    eventid: string;
    ticketid: string;
    title: string;
    venue: string;
    unixdatetime: number;
    seat: string;
  };
  isCheckin?: boolean;
  qrUrl?: string;
  handleClearTicket?: React.MouseEventHandler;
  handleCheckInTicket?: React.MouseEventHandler;
}

export default function TicketQRDisplay({
  ticket,
  isCheckin = false,
  qrUrl,
  handleClearTicket,
  handleCheckInTicket
}: Props) {

  const ref = useRef<HTMLTableElement>(null)

  const localeDatetime = new Date(ticket.unixdatetime);

  const handleSaveTicketAsPNG = (e: React.MouseEvent<HTMLButtonElement>) => {
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
    <div className="TicketQRDisplay d-flex flex-column align-items-center">
      <table className='table table-light text-center' style={{ maxWidth: '500px' }} ref={ref}>
        <tbody>
          {/* Ticket display options - ID's for check-in, QR code for display */}
          {
            isCheckin ?
              <>
                <tr>
                  <td>
                    Ticket ID:
                  </td>
                  <td>{ticket.ticketid}</td>
                </tr>
                <tr>
                  <td>
                    Event ID:
                  </td>
                  <td>{ticket.eventid}</td>
                </tr>
              </>
              :
              <tr>
                <td colSpan={2}>
                  <img src={qrUrl} />
                </td>
              </tr>
          }

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
            <td>{localeDatetime.toLocaleDateString()}</td>
          </tr>
          <tr>
            <td>Time:</td>
            <td>{localeDatetime.toLocaleTimeString(undefined, { timeZoneName: 'short' })}</td>
          </tr>
          <tr>
            <td>Seat:</td>
            <td>{ticket.seat}</td>
          </tr>
        </tbody>
      </table>

      {/* Button Options */}
      {
        isCheckin ?
          <button type='button' onClick={handleCheckInTicket}>Check-In</button>
          :
          <>
            <button type='button' onClick={handleSaveTicketAsPNG}>Save for Offline</button>
            <button type='button' onClick={handleClearTicket}>Generate another ticket?</button>
          </>
      }
    </div>
  )
}