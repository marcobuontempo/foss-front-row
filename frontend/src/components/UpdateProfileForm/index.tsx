import { ChangeEvent, FormEvent, useState } from 'react'
import './UpdateProfileForm.css'
import { useAppSelector } from '@utils/useAppSelector';
import { selectUserDetails } from '@features/user/userDetailsSlice';
import { updateUserDetails } from '@services/api';
import { toast } from 'react-toastify';

type Props = {}

export default function UpdateProfileForm({ }: Props) {
  const userDetails = useAppSelector(selectUserDetails);

  const [firstname, setFirstname] = useState(userDetails.firstname);
  const [lastname, setLastname] = useState(userDetails.lastname);
  const [email, setEmail] = useState(userDetails.email);
  const [phone, setPhone] = useState(userDetails.phone);
  const [address, setAddress] = useState(userDetails.address);
  const [confirmSubmit, setConfirmSubmit] = useState(false);

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
      .then(_response => {
        toast.success("Profile Updated!")
      })
      .catch(error => {
        const message = (error.response.status === 409) ?
          "Registration Failed! Username or Email is already taken." :
          "Registration Failed! Please use valid values.";
        toast.error(message);
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
          pattern='^\S+@\S+\.\S+$'
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
          minLength={10}
          maxLength={14}
          pattern='^[0-9]{10,14}$'
        />
        <label htmlFor="inputPhone" className="form-label">Phone (optional)</label>
        <div id="phoneHelpBlock" className="form-text">
          Phone must be 10-14 digits, numbers only
        </div>
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
    </form>
  )
}