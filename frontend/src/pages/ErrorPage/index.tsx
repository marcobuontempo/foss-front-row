import React from 'react'
import { useRouteError, isRouteErrorResponse } from 'react-router-dom'
import './ErrorPage.css'

type Props = {
  customText?: string;
}

export default function ErrorPage({ customText }: Props) {
  const error: unknown = useRouteError();

  return (
    <main className='ErrorPage mainpage container-fluid text-center d-flex flex-column justify-content-center h-100 gap-3'>
      <h1 className='m-0'>Oops!</h1>
      <p className='m-0'>Sorry, an unexpected error has occurred.</p>
      <p className='m-0'>
        {
          customText ?
            <i>{customText}</i> :
            <i>{isRouteErrorResponse(error) ? error.statusText : 'Unknown Error'}</i>
        }
      </p>
    </main>
  )
}