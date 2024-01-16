import TicketsList from '@components/TicketsList'
import { CartState, selectCart } from '@features/cart/cartSlice'
import { useAppSelector } from '@utils/useAppSelector'
import React from 'react'

type Props = {}

export default function CartItemsDisplay({ }: Props) {
  const cart = useAppSelector(selectCart)

  return (
    <table className='CartItemsDisplay table table-flush'>
      <tbody>
        {
          Object.values(cart).every(arr => arr.length === 0) ?
            <tr>
              <td className='text-center'>Cart is empty!</td>
            </tr>
            :
            <tr>
              <td>
                <TicketsList tickets={cart.tickets} isCart={true} />
              </td>
            </tr>
        }
      </tbody>
    </table>
  )
}