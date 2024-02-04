import React from 'react'
import Banner from '@components/Banner'
import InfoPanel from '@components/InfoPanel'
import './HomePage.css'
import { Link } from 'react-router-dom'
import { useAppSelector } from '@utils/useAppSelector'
import { selectAuth } from '@features/auth/authSlice'

type Props = {}

export default function HomePage({ }: Props) {
  const auth = useAppSelector(selectAuth);

  return (
    <main className='HomePage mainpage'>
      <Banner />
      <InfoPanel title='Secured Tickets'>
        Each ticket will create a unique identifier during creation, using protected information not available to the frontend user. The data is then hashed to prevent the data from being decoded or reverse-engineered, creating a fraud-preventive and secure ticket.
      </InfoPanel>
      <InfoPanel title='ACID Compliant' alt={true}>
        Using a MongoDB Replica Set (or Cluster Set, if preferable, when self-hosted), the ticketing system is able to follow ACID compliance. This mitigates issues relating to race-conditions, inconsist states, and data-loss prevention.
      </InfoPanel>
      <InfoPanel title='JWT Authentication'>
        JSON Web Tokens means that the backend can remain completely stateless, while also ensuring authentication and authorisation abilities for users.
      </InfoPanel>
      <InfoPanel title='RESTful Application' alt={true}>
        The backend follows RESTful principles, including being completely stateless. Since the frontend and backend have a complete separation of concerns, the backend can even be deployed by itself (along with a database), as a stand-alone REST API.
      </InfoPanel>
      <InfoPanel title='Admin Abilities'>
        Admin Accounts are implemented into the system with higher privileges than generic users. While the frontend will only expose these protected routes to Admin users, the backend securely prevents bad-actors from attempting to access these endpoints anyway by requiring authentication.
      </InfoPanel>

      <div className='HomePage__get_started'>
        <h2>Get Started Now!</h2>
        {
          auth.isAuthenticated ?
            <Link to='/events'>Check Out Events &gt;&gt;</Link>
            :
            <>
              <Link to='/login'>Login</Link>
              <Link to='/login'>Register</Link>
            </>
        }
      </div>
    </main>
  )
}