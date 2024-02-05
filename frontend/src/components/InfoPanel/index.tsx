import React from 'react'
import './InfoPanel.css'

type Props = {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  alt?: boolean;
}

export default function InfoPanel({ title, icon, children, alt = false }: Props) {
  return (
    <section className={`InfoPanel container-fluid text-center ${alt && 'InfoPanel__alt'}`}>
      <div className='InfoPanel__bg_icon'>
        {icon}
      </div>
      <div className='InfoPanel__row row'>
        {
          alt ?
            <>
              <div className='InfoPanel__text col-4'>{children}</div>
              <h2 className='InfoPanel__title col-8'>{title}</h2>
            </>
            :
            <>
              <h2 className='InfoPanel__title col-8'>{title}</h2>
              <div className='InfoPanel__text col-4'>{children}</div>
            </>
        }

      </div>
    </section>
  )
}