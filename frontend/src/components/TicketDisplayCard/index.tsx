import React from 'react'
import { TicketResponse } from '@services/api';
import './TicketDisplayCard.css'
import { addTicketToCart } from '@features/cart/cartSlice';
import { useAppDispatch } from '@utils/useAppDispatch';

type Props = {
  ticketData: TicketResponse['data'];
}

export default function TicketDisplayCard({ ticketData }: Props) {
  const { price, seat, available } = ticketData;

  const dispatch = useAppDispatch();

  const handleAddTicketToCartOnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(addTicketToCart(ticketData));
  }

  return (
    <tr className='TicketDisplayCard'>
      <td>{seat}</td>
      <td>{price === 0 ? "FREE" : price}</td>
      <td>
        <button
          className={available ? "btn btn-success" : "btn btn-danger"}
          disabled={!available} onClick={handleAddTicketToCartOnClick}>
          {available ? "Add To Cart" : "Unavailable"}
        </button>
      </td>
    </tr>
  )
}