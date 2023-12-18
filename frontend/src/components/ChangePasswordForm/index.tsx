import React, { ChangeEvent, FormEvent, useState } from 'react'
import './ChangePasswordForm.css'
import { useAppSelector } from '@utils/useAppSelector';
import { updatePassword } from '@services/api';
import { selectUserId } from '@features/auth/authSlice';

type Props = {}

export default function ChangePasswordForm({ }: Props) {
  const userid = useAppSelector(selectUserId);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const handleCurrentPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCurrentPassword(e.target?.value);
  };

  const handleNewPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.target?.value);
  };

  const handleConfirmNewPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setConfirmNewPassword(e.target?.value);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Check that new passwords match
    if (newPassword !== confirmNewPassword) {
      console.log("Error: Passwords don't match.");
      return;
    }

    const passwords = {
      currentpassword: currentPassword,
      newpassword: newPassword,
    }

    // form submission logic
    if (userid) {
      updatePassword(userid, passwords)
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.log(error);
        })
    }
  };

  return (
    <>
      <h1 className='text-center'>Change Password</h1>
      <form className='ChangePasswordForm container-sm py-3 text-center' onSubmit={handleSubmit} >

        <div className='form-floating mb-3'>
          <input
            type="password"
            className="form-control"
            id="inputCurrentPassword"
            value={currentPassword}
            onChange={handleCurrentPasswordChange}
            placeholder='Current Password'
            required={true}
          />
          <label htmlFor="inputCurrentPassword" className="form-label">Current Password</label>
        </div>
        <div className='form-floating mb-3'>
          <input
            type="password"
            className="form-control"
            id="inputNewPassword"
            aria-describedby='passwordHelpBlock'
            value={newPassword}
            onChange={handleNewPasswordChange}
            placeholder='New Password'
            required={true}
          />
          <label htmlFor="inputNewPassword" className="form-label">New Password</label>
        </div>
        <div className='form-floating mb-3'>
          <input
            type="password"
            className="form-control"
            id="inputConfirmNewPassword"
            aria-describedby='passwordHelpBlock'
            value={confirmNewPassword}
            onChange={handleConfirmNewPasswordChange}
            placeholder='Confirm New Password'
            required={true}
          />
          <label htmlFor="inputConfirmNewPassword" className="form-label">Confirm New Password</label>
          <div id="passwordHelpBlock" className="form-text">
            TODO: Your password must be 8-20 characters long...
          </div>
        </div>

        <button type="submit" className="btn btn-primary">Change Password</button>
      </form>
    </>
  )
}