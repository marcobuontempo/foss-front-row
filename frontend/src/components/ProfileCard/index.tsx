import React from 'react'
import './ProfileCard.css'
import { selectUserDetails } from '@features/user/userDetailsSlice';
import { useAppSelector } from '@utils/useAppSelector';
import { UserDetailsResponse } from '@services/api';

type Props = {}

export default function ProfileCard({ }: Props) {
  const userDetails = useAppSelector(selectUserDetails);

  return (
    <div className='ProfileCard'>
      <h1 className="text-center">Profile</h1>
      <table className='table table-bordered table-striped container-sm'>
        <tbody>
          {Object.keys(userDetails).map(k => {
            if (k === "_id") return null; // Skip rendering for the "_id" key
            return (
              <tr key={k}>
                <td>{k}</td>
                <td>{userDetails[k as keyof UserDetailsResponse['data']] || "N/A"}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>

  )
}