import React from 'react'
import './InfoPanel.css'

type Props = {}

export default function InfoPanel({ }: Props) {
  return (
    <section className='InfoPanel container-fluid text-center' style={{ background: "green", height: "500px" }}>
      <div className='row justify-content-between'>
        <div className='col-8'>FIRST</div>
        <div className='col-4'>SECOND</div>
      </div>
    </section>
  )
}