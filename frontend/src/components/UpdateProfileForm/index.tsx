import React, { ChangeEvent, FormEvent, useState } from 'react'
import './UpdateProfileForm.css'
import { useAppSelector } from '@utils/useAppSelector';
import { selectUserDetails } from '@features/user/userDetailsSlice';
import { updateUserDetails } from '@services/api';
import SuccessModal from '@components/SuccessModal';

type Props = {}

export default function UpdateProfileForm({ }: Props) {
  const userDetails = useAppSelector(selectUserDetails);

  const [firstname, setFirstname] = useState(userDetails.firstname);
  const [lastname, setLastname] = useState(userDetails.lastname);
  const [email, setEmail] = useState(userDetails.email);
  const [phone, setPhone] = useState(userDetails.phone);
  const [address, setAddress] = useState(userDetails.address);
  const [confirmSubmit, setConfirmSubmit] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleFirstnameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFirstname(e.target?.value);
    setConfirmSubmit(false);
  };

  const handleLastnameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLastname(e.target?.value);
    setConfirmSubmit(false);
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target?.value);
    setConfirmSubmit(false);
  };

  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target?.value);
    setConfirmSubmit(false);
  };

  const handleAddressChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target?.value);
    setConfirmSubmit(false);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Ensure submission is only when confirm is selected
    if (!confirmSubmit) {
      setConfirmSubmit(true);
      return;
    }

    // Get updated values -> removes any key/values with "" as value (to prevent accidental override of existing details with empty strings)
    const updatedDetails = Object.fromEntries(
      Object.entries({
        firstname,
        lastname,
        email,
        phone,
        address,
      })
        .filter(([_, value]) => value !== ""));

    // form submission logic
    await updateUserDetails(userDetails._id, updatedDetails)
      .then(response => {
        // Display modal
        setSuccess(true);
        // Reset form
        setFirstname("");
        setLastname("");
        setEmail("");
        setPhone("");
        setAddress("");
      })
      .catch(error => {
        return;
      })

    // Reset confirmation
    setConfirmSubmit(false);
  };

  return (
    <form className='UpdateProfileForm container-sm py-3 text-center' onSubmit={handleSubmit}>
      <h1 className='text-center'>Update Details</h1>

      <div className='form-floating mb-3'>
        <input
          type="text"
          className="form-control"
          id="inputFirstname"
          value={firstname}
          onChange={handleFirstnameChange}
          placeholder='First Name'
        />
        <label htmlFor="inputFirstname" className="form-label">First Name</label>
      </div>

      <div className='form-floating mb-3'>
        <input
          type="text"
          className="form-control"
          id="inputLastname"
          value={lastname}
          onChange={handleLastnameChange}
          placeholder='Last Name'
        />
        <label htmlFor="inputLastname" className="form-label">Last Name</label>
      </div>

      <div className='form-floating mb-3'>
        <input
          type="email"
          className="form-control"
          id="inputEmail"
          value={email}
          onChange={handleEmailChange}
          placeholder='Email'
        />
        <label htmlFor="inputEmail" className="form-label">Email</label>
      </div>

      <div className='form-floating mb-3'>
        <input
          type="tel"
          className="form-control"
          id="inputPhone"
          value={phone}
          onChange={handlePhoneChange}
          placeholder='Phone (optional)'
        />
        <label htmlFor="inputPhone" className="form-label">Phone (optional)</label>
      </div>

      <div className='form-floating mb-3'>
        <input
          type="text"
          className="form-control"
          id="inputAddress"
          value={address}
          onChange={handleAddressChange}
          placeholder='Address (optional)'
        />
        <label htmlFor="inputAddress" className="form-label">Address (optional)</label>
      </div>

      <button type="submit" className="btn btn-primary">{confirmSubmit ? "Confirm?" : "Update Details"}</button>

      <SuccessModal
        isOpen={success}
        setIsOpen={setSuccess}
      >
        Profile Details Updated!
      </SuccessModal>
    </form>
  )
}