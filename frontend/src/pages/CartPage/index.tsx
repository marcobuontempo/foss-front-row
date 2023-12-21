import React from 'react'
import './CartPage.css'
import CartItemsDisplay from '@components/CartItemsDisplay'

type Props = {}

export default function CartPage({}: Props) {
  return (
    <main className='CartPage'>
      <CartItemsDisplay />
    </main>
  )
}