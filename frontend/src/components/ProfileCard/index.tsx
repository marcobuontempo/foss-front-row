import React from 'react'
import './ProfileCard.css'
import { UserDetailsResponse } from '@services/api'

type Props = {
  profileDetails: UserDetailsResponse['data'] | null;
}

export default function ProfileCard({ profileDetails }: Props) {
  if (!profileDetails) {
    return <p>Details not fetched...</p>
  }

  return (
    <table className='table table-striped'>
      <tbody>
        <tr>
          <td>Firstname:</td>
          <td>{profileDetails.firstname}</td>
        </tr>
        <tr>
          <td>Lastname:</td>
          <td>{profileDetails?.lastname}</td>
        </tr>
        <tr>
          <td>DOB:</td>
          <td>{profileDetails?.dob}</td>
        </tr>
        <tr>
          <td>Email:</td>
          <td>{profileDetails?.email}</td>
        </tr>
        <tr>
          <td>Phone:</td>
          <td>{profileDetails?.phone}</td>
        </tr>
        <tr>
          <td>Address:</td>
          <td>{profileDetails?.address}</td>
        </tr>
      </tbody>
    </table>
  )
}