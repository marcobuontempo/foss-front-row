import React from 'react'
import './LoginPage.css'
import LoginForm from '@components/LoginForm'

type Props = {}

export default function LoginPage({ }: Props) {
  return (
    <main className='LoginPage text-center'>
      <LoginForm />
    </main>
  )
}