import React, { useRef } from 'react'
import * as htmlToImage from 'html-to-image';
import './TicketQRDisplay.css'

type Props = {
  ticket: {
    id: string;
    event: string;
    title: string;
    venue: string;
    unixdatetime: number;
    seat: string;
  };
  isScanned?: boolean;
  qrUrl?: string;
  handleClearTicket?: React.MouseEventHandler;
  handleCheckInTicket?: React.MouseEventHandler;
}

export default function TicketQRDisplay({
  ticket,
  isScanned = false,
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
        link.download = `ticket_${ticket.id}.png`
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
          {/* Ticket display options */}
          {
            isScanned ?
            // show ID's when ticket has been scanned
              <>
                <tr>
                  <td>
                    Ticket ID:
                  </td>
                  <td>{ticket.id}</td>
                </tr>
                <tr>
                  <td>
                    Event ID:
                  </td>
                  <td>{ticket.event}</td>
                </tr>
              </>
              :
              // show qr code when creating ticket
              <tr>
                <td colSpan={2}>
                  <img className='TicketQRDisplay__qr' src={qrUrl} />
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
        isScanned ?
          <button className='btn btn-info' type='button' onClick={handleCheckInTicket}>Check-In</button>
          :
          <>
            <button className='btn btn-info' type='button' onClick={handleSaveTicketAsPNG}>Save for Offline</button>
            <button className='btn btn-info' type='button' onClick={handleClearTicket}>Generate another ticket?</button>
          </>
      }
    </div>
  )
}