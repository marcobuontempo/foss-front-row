import React, { useEffect } from 'react'
import './ProfilePage.css'
import { getUserDetails } from '@services/api';
import { useAppSelector } from '@utils/useAppSelector';
import { selectAuth } from '@features/auth/authSlice';
import { Outlet, useLocation } from 'react-router-dom';
import { useAppDispatch } from '@utils/useAppDispatch';
import { setUserDetails } from '@features/user/userDetailsSlice';
import { Link } from 'react-router-dom';

type Props = {}

export default function ProfilePage({ }: Props) {
  const { userid } = useAppSelector(selectAuth);

  const currentRoute = useLocation().pathname.split("/").slice(-1)[0]

  const dispatch = useAppDispatch();

  const fetchProfileDetails = async () => {
    if (userid) {
      await getUserDetails(userid)
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
    <main className='ProfilePage mainpage'>

      {/* Nav Links */}
      <ul className="nav nav-tabs justify-content-center">
        <li className="nav-item">
          <Link
            className={`nav-link ${currentRoute === "profile" && "active"}`}
            to={""}>
            Profile
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className={`nav-link ${currentRoute === "orders" && "active"}`}
            to={"orders"}>
            My Orders
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className={`nav-link ${currentRoute === "settings" && "active"}`}
            to={"settings"}>
            Account Settings
          </Link>
        </li>
      </ul>

      {/* Content */}
      <Outlet />
    </main>
  )
}