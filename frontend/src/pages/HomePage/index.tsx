import Banner from '@components/Banner'
import InfoPanel from '@components/InfoPanel'
import './HomePage.css'
import { Link } from 'react-router-dom'
import { useAppSelector } from '@utils/useAppSelector'
import { selectAuth } from '@features/auth/authSlice'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleNodes, faDatabase, faKey, faLock, faUserTie } from '@fortawesome/free-solid-svg-icons'

type Props = {}

export default function HomePage({ }: Props) {
  const auth = useAppSelector(selectAuth);

  return (
    <main className='HomePage mainpage'>
      <Banner />
      <InfoPanel
        title='Secured Tickets'
        icon={<FontAwesomeIcon icon={faLock} />}
      >
        Each ticket, and the system itself, is inherently fraud-preventive. This is achieved with the generation of a unique identifier for every individual ticket, using protected information not accessible to the frontend user, which is then one-way hashed to prevent decoding.
      </InfoPanel>
      <InfoPanel
        title='ACID Compliant'
        icon={<FontAwesomeIcon icon={faDatabase} />}
        alt={true}
      >
        Leveraging a MongoDB Replica Set (or, if preferred, a Cluster Set for self-hosted instances), our ticketing system supports multi-document transactions, adhering to ACID compliance.
        </InfoPanel>
      <InfoPanel
        title='JWT Authentication'
        icon={<FontAwesomeIcon icon={faKey} />}
      >
        JSON Web Tokens means that the backend can remain completely stateless, while also ensuring authentication and authorisation abilities for users.
      </InfoPanel>
      <InfoPanel
        title='RESTful Application'
        icon={<FontAwesomeIcon icon={faCircleNodes} />}
        alt={true}
      >
        Our backend strictly adheres to RESTful principles, emphasizing complete statelessness. This design allows for modularity and scalability, enabling the backend to function independently, and can even be deployed as a stand-alone REST API alongside a database.
        </InfoPanel>
      <InfoPanel
        title='Admin Abilities'
        icon={<FontAwesomeIcon icon={faUserTie} />}
      >
        Admin Accounts, with higher privileges than generic users, are seamlessly integrated into the system. While the frontend exclusively exposes protected routes to Admin users, the backend, through authentication and authorisation mechanisms, ensures the secure prevention of unauthorised attempts to access these endpoints.
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
    </main >
  )
}