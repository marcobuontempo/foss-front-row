import React from 'react'
import { TicketResponse } from '@services/api';
import './TicketDisplayCard.css'
import { addTicketToCart, removeTicketFromCart, selectCart } from '@features/cart/cartSlice';
import { useAppDispatch } from '@utils/useAppDispatch';
import { useAppSelector } from '@utils/useAppSelector';

type Props = {
  ticketData: TicketResponse['data'];
  showRemoveButton?: boolean;
}

export default function TicketDisplayCard({ ticketData, showRemoveButton = false }: Props) {
  const { price, seat, available } = ticketData;

  const { tickets } = useAppSelector(selectCart);

  const dispatch = useAppDispatch();

  const handleAddTicketToCartOnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(addTicketToCart(ticketData));
  }

  const handleRemoveTicketFromCartOnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(removeTicketFromCart(ticketData._id));
  }

  // Change state if ticket is in already in cart
  const isTicketInCart = () => tickets.some(ticket => ticket._id === ticketData._id);

  return (
    <tr className='TicketDisplayCard'>
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