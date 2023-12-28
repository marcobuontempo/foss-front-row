import React from 'react'
import './CartPage.css'
import CartItemsDisplay from '@components/CartItemsDisplay'
import { useAppSelector } from '@utils/useAppSelector'
import { selectCart } from '@features/cart/cartSlice'
import { TicketResponse, orderTickets } from '@services/api'
import { updateAllItemsInCart } from '@utils/cartStorage'

type Props = {}

export default function CartPage({ }: Props) {
  const { tickets } = useAppSelector(selectCart);

  const submitTicketOrder = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    
    let unprocessedTickets = tickets.map(ticket => ticket)
    let failedTickets: TicketResponse['data'][] = [];

    // repeat until no tickets left to process
    while (unprocessedTickets.length > 0) {
      const currentEventId = unprocessedTickets[0].eventid  // get eventid of an unprocessed ticket in array
      const ticketsToOrder = unprocessedTickets.filter(ticket => ticket.eventid === currentEventId).map(ticket => ticket._id);  // get array of all ticketids that match the current eventid to place order for

      // place order
      if (currentEventId) {
        await orderTickets(currentEventId, ticketsToOrder)
        .then(data => {
          console.log(data)
        })
        .catch(error => {
            failedTickets = [...failedTickets, ...unprocessedTickets.filter(ticket => ticket.eventid === currentEventId)];  // store reference to any failed tickets
            console.log(error)
          })
      }

      // remove tickets from unprocessed array
      unprocessedTickets = unprocessedTickets.filter(ticket => ticket.eventid !== currentEventId)
    }

    // update redux store to only contain remaining unprocessed tickets (i.e. failed order tickets)
    updateAllItemsInCart('tickets', failedTickets);
  }

  return (
    <main className='CartPage'>
      <CartItemsDisplay />
      <button className='btn btn-info' onClick={submitTicketOrder}>Order Tickets</button>
    </main>
  )
}