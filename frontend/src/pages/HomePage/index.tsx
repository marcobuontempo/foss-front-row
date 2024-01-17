import React from 'react'
import Banner from '@components/Banner'
import InfoPanel from '@components/InfoPanel'
import './HomePage.css'

type Props = {}

export default function HomePage({ }: Props) {
  return (
    <main className='HomePage mainpage'>
      <Banner />
      <InfoPanel />
      <InfoPanel />
      <InfoPanel />
      <InfoPanel />
      <InfoPanel />
    </main>
  )
}