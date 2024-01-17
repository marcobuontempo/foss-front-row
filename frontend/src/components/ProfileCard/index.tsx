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
      <table className='table table-bordered table-striped container-sm'>
        <tbody>
          {Object.entries(userDetails).map(([key, value]) => {
            if (key === "_id") return null; // Skip rendering for the "_id" key
            return (
              <tr key={key}>
                <td>{key} {key === 'dob' && '(YYYY-MM-DD)'}</td>
                <td>
                  {
                    key === 'dob' ?
                      value.split("T")[0] :
                      (value || "N/A")
                  }
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>

  )
}