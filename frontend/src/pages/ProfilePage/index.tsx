import React, { useEffect, useState } from 'react'
import './ProfilePage.css'
import { UserDetailsResponse, getUserDetails } from '@services/api';
import { useAppSelector } from '@utils/useAppSelector';
import { selectUserId } from '@features/auth/authSlice';
import ProfileCard from '@components/ProfileCard';
import { Outlet } from 'react-router-dom';
import { useAppDispatch } from '@utils/useAppDispatch';
import { setUserDetails } from '@features/user/userDetailsSlice';

type Props = {}

export default function ProfilePage({ }: Props) {
  const userid = useAppSelector(selectUserId);

  const dispatch = useAppDispatch();

  const fetchProfileDetails = async () => {
    if (userid) {
      getUserDetails(userid)
        .then(response => {
          dispatch(setUserDetails(response.data));
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
      <Outlet />
    </main>
  )
}