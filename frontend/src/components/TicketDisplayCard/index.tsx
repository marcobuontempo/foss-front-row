import React from 'react'
import { TicketResponse } from '@services/api';
import './TicketDisplayCard.css'
import { selectCart } from '@features/cart/cartSlice';
import { useAppSelector } from '@utils/useAppSelector';
import { addOrRemoveItemToCart } from '@utils/cartStorage';

type Props = {
  ticketData: TicketResponse['data'];
  showRemoveButton?: boolean;
  isCart?: boolean;
}

export default function TicketDisplayCard({
  ticketData,
  isCart = false,
  showRemoveButton = false
}: Props) {
  
  const { event, price, seat, available } = ticketData;

  const { tickets } = useAppSelector(selectCart);


  const handleAddTicketToCartOnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    addOrRemoveItemToCart('tickets', 'add', ticketData);
  }

  const handleRemoveTicketFromCartOnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    addOrRemoveItemToCart('tickets', 'remove', ticketData);
  }

  // Change state if ticket is in already in cart
  const isTicketInCart = () => tickets.some(ticket => ticket._id === ticketData._id);

  return (
    <tr className='TicketDisplayCard'>
      {
        // show event id when in card
        isCart &&
        <td>{event}</td>
      }
      <td>{seat}</td>
      <td>{price === 0 ? "FREE" : price}</td>
      <td>
        {
          showRemoveButton || isTicketInCart() ?
            <button
              className='btn btn-danger'
              onClick={handleRemoveTicketFromCartOnClick}>
              Remove From Cart
            </button>
            :
            <button
              className={available ? "btn btn-success" : "btn btn-secondary"}
              disabled={!available} onClick={handleAddTicketToCartOnClick}>
              {available ? "Add To Cart" : "Unavailable"}
            </button>
        }
      </td>
    </tr>
  )
}