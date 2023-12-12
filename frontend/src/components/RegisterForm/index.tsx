import React, { ChangeEvent, FormEvent, useState } from 'react'
import './RegisterForm.css'
import axios from 'axios';

type Props = {}

export default function RegisterForm({ }: Props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [dob, setDob] = useState('');

  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target?.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target?.value);
  };

  const handleFirstnameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFirstname(e.target?.value);
  };

  const handleLastnameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLastname(e.target?.value);
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target?.value);
  };

  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target?.value);
  };

  const handleAddressChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target?.value);
  };

  const handleDobChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDob(e.target?.value);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // form submission logic
    axios
      .request({
        method: 'post',
        url: `${import.meta.env.VITE_BACKEND_URL}/auth/register`,
        data: {
          username,
          password,
          firstname,
          lastname,
          email,
          phone,
          address,
          dob
        }
      })
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      })
  };

  return (
    <form className='RegisterForm container-sm py-3 text-center' onSubmit={handleSubmit}>
      <fieldset>
        <legend>Personal Details</legend>
        <div className='form-floating mb-3'>
          <input
            type="text"
            className="form-control"
            id="inputFirstname"
            value={firstname}
            onChange={handleFirstnameChange}
            placeholder='First Name'
            required={true}
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
            required={true}
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
            required={true}
          />
          <label htmlFor="inputEmailname" className="form-label">Email</label>
        </div>

        <div className='form-floating mb-3'>
          <input
            type="tel"
            className="form-control"
            id="inputPhone"
            value={phone}
            onChange={handlePhoneChange}
            placeholder='Phone (optional)'
            required={false}
          />
          <label htmlFor="inputPhonename" className="form-label">Phone (optional)</label>
        </div>

        <div className='form-floating mb-3'>
          <input
            type="text"
            className="form-control"
            id="inputAddress"
            value={address}
            onChange={handleAddressChange}
            placeholder='Address (optional)'
            required={false}
          />
          <label htmlFor="inputAddressname" className="form-label">Address (optional)</label>
        </div>

        <div className='form-floating mb-3'>
          <input
            type="date"
            className="form-control"
            id="inputDob"
            value={dob}
            onChange={handleDobChange}
            placeholder='DOB'
            required={true}
          />
          <label htmlFor="inputDobname" className="form-label">DOB</label>
        </div>
      </fieldset>


      <fieldset>
        <legend>Account Details</legend>
        <div className='form-floating mb-3'>
          <input
            type="text"
            id="inputUsername"
            className="form-control"
            value={username}
            onChange={handleUsernameChange}
            placeholder='Username'
            required={true}
          />
          <label htmlFor="inputUsername" className="form-label">Username</label>
        </div>

        <div className='form-floating mb-3'>
          <input
            type="password"
            className="form-control"
            id="inputPassword"
            aria-describedby='passwordHelpBlock'
            value={password}
            onChange={handlePasswordChange}
            placeholder='Password'
            required={true}
          />
          <label htmlFor="inputPassword" className="form-label">Password</label>
          <div id="passwordHelpBlock" className="form-text">
            Your password must be 8-20 characters long... TODO
          </div>
        </div>
      </fieldset>


      <button type="submit" className="btn btn-primary">Register</button>
    </form>
  )
}