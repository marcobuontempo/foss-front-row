import React from 'react'
import './RegisterPage.css'
import RegisterForm from '@components/RegisterForm'

type Props = {}

export default function RegisterPage({ }: Props) {
  return (
    <main className='RegisterPage text-center'>
      <RegisterForm />
    </main>
  )
}