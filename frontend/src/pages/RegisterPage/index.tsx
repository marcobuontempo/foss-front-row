import React from 'react'
import './RegisterPage.css'
import RegisterForm from '@components/RegisterForm'

type Props = {}

export default function RegisterPage({ }: Props) {
  return (
    <main className='RegisterPage text-center'>
      <h1>Register</h1>
      <RegisterForm />
    </main>
  )
}