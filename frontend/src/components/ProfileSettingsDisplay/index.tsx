import { Link } from 'react-router-dom'
import './ProfileSettingsDisplay.css'

type Props = {}

export default function ProfileSettingsDisplay({ }: Props) {
  return (
    <div className='ProfileSettingsDisplay d-flex flex-column align-items-center'>
      <Link to={'/profile/update'}>Update Details</Link>
      <Link to={'/profile/change-password'}>Change Password</Link>
      <Link to={'/profile/delete-account'}>Delete Account</Link>
    </div>
  )
}