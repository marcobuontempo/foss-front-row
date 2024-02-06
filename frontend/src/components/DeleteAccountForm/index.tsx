import { ChangeEvent, FormEvent, useState } from 'react'
import './DeleteAccountForm.css'
import { useAppSelector } from '@utils/useAppSelector';
import { deleteUser } from '@services/api';
import { selectAuth } from '@features/auth/authSlice';

type Props = {}

export default function DeleteAccountForm({ }: Props) {
  const { userid } = useAppSelector(selectAuth);

  const [confirmationText, setConfirmationText] = useState("");

  const handleConfirmationTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    setConfirmationText(e.target?.value);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Check that new passwords match
    if (confirmationText !== userid) {
      console.log(`Error: Confirmation text does not match ${userid}`);
      return;
    }

    // form submission logic
    if (userid) {
      await deleteUser(userid)
        .then(_response => {
          // console.log(response);
        })
        .catch(_error => {
          // console.log(error);
        })
    }
  };

  return (
    <form className='DeleteAccountForm container-sm py-3 text-center' onSubmit={handleSubmit} >
      <h1 className='text-center'>Change Password</h1>
      <p>Please type <b>{userid}</b> to confirm account deletion:</p>
      <div className='form-floating mb-3'>
        <input
          type="text"
          className="form-control"
          id="inputConfirmationText"
          value={confirmationText}
          onChange={handleConfirmationTextChange}
          placeholder='Confirmation Text'
          required={true}
        />
        <label htmlFor="inputConfirmationText" className="form-label">Confirmation Text</label>
      </div>

      <button type="submit" className="btn btn-danger">Delete Account</button>
    </form>
  )
}