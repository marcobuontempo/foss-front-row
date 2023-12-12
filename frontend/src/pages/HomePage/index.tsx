import React from 'react'
import Banner from '@components/Banner'
import InfoPanel from '@components/InfoPanel'
import './HomePage.css'

type Props = {}

export default function HomePage({ }: Props) {
  return (
    <main className='HomePage'>
      <Banner />
      <InfoPanel />
      <InfoPanel />
      <InfoPanel />
      <InfoPanel />
      <InfoPanel />
    </main>
  )
}