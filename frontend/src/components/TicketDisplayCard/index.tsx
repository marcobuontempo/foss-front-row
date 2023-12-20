import React from 'react'
import { TicketResponse } from '@services/api';
import './TicketDisplayCard.css'

type Props = {
  ticketData: TicketResponse['data'];
}

export default function TicketDisplayCard({ ticketData }: Props) {
  const { _id, price, seat, available } = ticketData;

  const requestOrderTicket = async () => {
    // orderTicket(_id)
    //   .then(response => {
    //     console.log(response.data)
    //   })
    //   .catch(error => {
    //     console.log(error)
    //   })
  }

  const handleReserveTicketOnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    requestOrderTicket();
  }

  return (
    <li className='TicketDisplayCard list-group-item d-flex align-items-center justify-content-center'>
      <table className='table table-bordered' style={{ maxWidth: '500px' }}>
        <tbody>
          <tr>
            <td>Seat:</td>
            <td>{seat}</td>
          </tr>
          <tr>
            <td>Price:</td>
            <td>{price === 0 ? "FREE" : price}</td>
          </tr>
          <tr>
            <td>Tickets:</td>
            <td>
              <button
                className={available ? "btn btn-success" : "btn btn-danger"}
                disabled={!available} onClick={handleReserveTicketOnClick}>
                {available ? "Reserve Ticket" : "Unavailable"}
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </li>
  )
}