import React, { useState } from 'react'
import './CartPage.css'
import CartItemsDisplay from '@components/CartItemsDisplay'
import { useAppSelector } from '@utils/useAppSelector'
import { selectCart } from '@features/cart/cartSlice'
import { TicketResponse, orderTickets } from '@services/api'
import { updateAllItemsInCart } from '@utils/cartStorage'
import { toast } from 'react-toastify'

type Props = {}

export default function CartPage({ }: Props) {
  const { tickets } = useAppSelector(selectCart);

  const [confirmSubmit, setConfirmSubmit] = useState(false);

  const submitTicketOrder = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!confirmSubmit) {
      setConfirmSubmit(true);
      return;
    }

    let unprocessedTickets = tickets.map(ticket => ticket)
    let failedTickets: TicketResponse['data'][] = [];

    // repeat until no tickets left to process
    while (unprocessedTickets.length > 0) {
      const currentEventId = unprocessedTickets[0].event  // get eventid of an unprocessed ticket in array
      const ticketsToOrder = unprocessedTickets.filter(ticket => ticket.event === currentEventId).map(ticket => ticket._id);  // get array of all ticketids that match the current eventid to place order for

      // place order
      if (currentEventId) {
        await orderTickets(currentEventId, ticketsToOrder)
          .then(response => {
            toast.success("Checkout Successful!")
          })
          .catch(error => {
            failedTickets = [...failedTickets, ...unprocessedTickets.filter(ticket => ticket.event === currentEventId)];  // store reference to any failed tickets
            toast.error("Some tickets failed to checkout. Please check cart.")
          })
      }

      // remove tickets from unprocessed array
      unprocessedTickets = unprocessedTickets.filter(ticket => ticket.event !== currentEventId)
    }

    // update redux store to only contain remaining unprocessed tickets (i.e. failed order tickets)
    updateAllItemsInCart('tickets', failedTickets);

    // Reset confirmation
    setConfirmSubmit(false);
  }

  return (
    <main className='CartPage mainpage'>
      <CartItemsDisplay />
      {
        tickets.length > 0 &&
        <button className='btn btn-info' onClick={submitTicketOrder}>{confirmSubmit ? "Confirm?" : "Place Order"}</button>
      }
    </main>
  )
}