import { ChangeEvent, FormEvent, useState } from 'react'
import './ChangePasswordForm.css'
import { useAppSelector } from '@utils/useAppSelector';
import { updatePassword } from '@services/api';
import { selectAuth } from '@features/auth/authSlice';
import { toast } from 'react-toastify';

type Props = {}

export default function ChangePasswordForm({ }: Props) {
  const { userid } = useAppSelector(selectAuth);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [confirmSubmit, setConfirmSubmit] = useState(false);

  const handleCurrentPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCurrentPassword(e.target?.value);
    setConfirmSubmit(false);
  };

  const handleNewPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.target?.value);
    setConfirmSubmit(false);
  };

  const handleConfirmNewPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setConfirmNewPassword(e.target?.value);
    setConfirmSubmit(false);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Ensure submission is only when confirm is selected
    if (!confirmSubmit) {
      setConfirmSubmit(true);
      return;
    }

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
      await updatePassword(userid, passwords)
        .then(_response => {
          // Display success
          toast.success("Password Updated!");
          // Reset form
          setCurrentPassword("");
          setNewPassword("");
          setConfirmNewPassword("");
        })
        .catch(_error => {
          toast.error("Password Upated Failed!");
        })
    }

    // Reset confirmation
    setConfirmSubmit(false);
  };

  return (
    <form className='ChangePasswordForm container-sm py-3 text-center' onSubmit={handleSubmit} >
      <h1 className='text-center'>Change Password</h1>

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
          minLength={8}
          pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$"
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
          minLength={8}
          pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$"
        />
        <label htmlFor="inputConfirmNewPassword" className="form-label">Confirm New Password</label>
        <div id="passwordHelpBlock" className="form-text">
          Password must be a minimum of 8 characters in length, contain at least one uppercase letter, one lowercase letter, one number, and one special character
        </div>
      </div>

      <button type="submit" className="btn btn-primary">{confirmSubmit ? "Confirm?" : "Change Password"}</button>
    </form>
  )
}