import React from 'react'
import './InfoPanel.css'

type Props = {
  title: string;
  children: React.ReactNode;
  alt?: boolean;
}

export default function InfoPanel({ title, children, alt = false }: Props) {
  return (
    <section className={`InfoPanel container-fluid text-center ${alt && 'InfoPanel__alt'}`}>
      <div className='InfoPanel__row row justify-content-between'>
        {
          alt ?
            <>
              <div className='col-4'>{children}</div>
              <h2 className='InfoPanel__title col-8'>{title}</h2>
            </>
            :
            <>
              <h2 className='InfoPanel__title col-8'>{title}</h2>
              <div className='col-4'>{children}</div>
            </>
        }

      </div>
    </section>
  )
}