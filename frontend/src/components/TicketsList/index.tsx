import TicketDisplayCard from '@components/TicketDisplayCard'
import { AllTicketsResponse, TicketResponse } from '@services/api'
import './TicketsList.css'
import React from 'react'

type Props = {
  tickets: AllTicketsResponse['data'];
  isCart?: boolean;
}

// Custom sort - by priority: eventid, availability, price
const sortByEventIdAvailabilityAndPrice = (a: TicketResponse['data'], b: TicketResponse['data']) => {
  // Compare eventids as strings
  const eventIdComparison = a.eventid.localeCompare(b.eventid);

  if (eventIdComparison === 0) {
    // If eventids are equal, check availability
    if (a.available === b.available) {
      // If availability is equal, sort by price
      return a.price - b.price;
    } else {
      // If availability is different, sort by availability
      return a.available ? -1 : 1;
    }
  } else {
    // If eventids are different, return the result of comparing eventids
    return eventIdComparison;
  }
};

export default function TicketsList({ tickets, isCart = false }: Props) {
  return (
    <table className='TicketsList table caption-top'>
      <caption className='text-center fw-bold'>TICKETS</caption>
      <thead>
        <tr className='table-light'>
          <th scope='col'>Seat</th>
          <th scope='col'>Price</th>
          <th scope='col'>Action</th>
        </tr>
      </thead>
      <tbody>
        {
          [...tickets]
            .sort(sortByEventIdAvailabilityAndPrice)
            .map(ticket => <TicketDisplayCard key={ticket._id} ticketData={ticket} showRemoveButton={isCart} />)
        }
      </tbody>
    </table>
  )
}