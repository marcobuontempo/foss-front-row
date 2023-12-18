import React, { useEffect, useState } from 'react'
import './ProfilePage.css'
import { UserDetailsResponse, getUserDetails } from '@services/api';
import { useAppSelector } from '@utils/useAppSelector';
import { selectUserId } from '@features/auth/authSlice';
import ProfileCard from '@components/ProfileCard';

type Props = {}

export default function ProfilePage({ }: Props) {
  const userid = useAppSelector(selectUserId);

  const [profileDetails, setProfileDetails] = useState<null | UserDetailsResponse['data']>(null);

  const fetchProfileDetails = async () => {
    if (userid) {
      getUserDetails(userid)
        .then(response => {
          // Map each empty value to "N/A"
          for (const key in response.data) {
            const typedKey = key as keyof UserDetailsResponse['data'];
            if (response.data[typedKey] === "") response.data[typedKey] = "N/A";
          }
          setProfileDetails(response.data);
        })
        .catch(error => {
          console.log(error);
        })
    }
  }

  useEffect(() => {
    fetchProfileDetails();
  }, []);

  return (
    <main className='ProfilePage'>
      <ProfileCard profileDetails={profileDetails} />
    </main>
  )
}