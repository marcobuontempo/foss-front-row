import React, { useEffect, useState } from 'react'
import './OrdersDisplay.css'
import { UserOrdersResponse, getUserOrders } from '@services/api'
import { useAppSelector } from '@utils/useAppSelector'
import { selectAuth } from '@features/auth/authSlice'

type Props = {}

export default function OrdersDisplay({ }: Props) {
  const { userid } = useAppSelector(selectAuth);

  const [orders, setOrders] = useState<UserOrdersResponse['data']>([]);

  useEffect(() => {
    if (userid) {
      getUserOrders(userid)
        .then(response => {
          setOrders(response.data);
        })
        .catch(error => {
          return;
        })
    }
  }, [])

  return (
    orders.length === 0 ?
      "No orders to display."
      :
      <table className='OrdersDisplay table'>
        <thead>
          <tr>
            <th>Order</th>
            <th>Event Title</th>
            <th>Ticket</th>
            <th>Ticket Seat</th>
            <th>Ticket Price</th>
            <th>Total Qty</th>
            <th>Total Price</th>
            <th>Created</th>
          </tr>
        </thead>
        <tbody>
          {
            orders.map(order => {
              return order
                .tickets.map((ticket, ticketIndex) => {
                  const isFirstOrder = ticketIndex === 0;
                  return (
                    <tr key={ticket._id}>
                      {
                        isFirstOrder &&
                        <>
                          <td rowSpan={order.totalQuantity}>{order._id}</td>
                          <td rowSpan={order.totalQuantity}>{order.event.title}</td>
                        </>
                      }
                      <td>{ticket._id}</td>
                      <td>{ticket.seat}</td>
                      <td>{ticket.price}</td>
                      {
                        isFirstOrder &&
                        <>
                          <td rowSpan={order.totalQuantity}>{order.totalQuantity}</td>
                          <td rowSpan={order.totalQuantity}>{order.totalPrice}</td>
                          <td rowSpan={order.totalQuantity}>{order.createdAt}</td>
                        </>
                      }
                    </tr>
                  )
                })
            })
          }
        </tbody>
      </table>
  )
}