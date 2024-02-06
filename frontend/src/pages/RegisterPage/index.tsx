import './RegisterPage.css'
import RegisterForm from '@components/RegisterForm'

type Props = {}

export default function RegisterPage({ }: Props) {
  return (
    <main className='RegisterPage mainpage text-center'>
      <RegisterForm />
    </main>
  )
}