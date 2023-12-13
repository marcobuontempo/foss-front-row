import React, { ChangeEvent, FormEvent, useState } from 'react'
import './LoginForm.css'
import axios from 'axios';

type Props = {}

export default function LoginForm({ }: Props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target?.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target?.value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // form submission logic
    axios
      .request({
        method: 'post',
        url: '/auth/login',
        data: {
          username,
          password,
        },
      })
      .then(response => {
        const { id, role } = response.data.data;
        localStorage.setItem('id', id);
        localStorage.setItem('role', role);
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      })
  };

  return (
    <form className='LoginForm container-sm py-3 text-center' onSubmit={handleSubmit}>
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
          TODO: Your password must be 8-20 characters long...
        </div>
      </div>

      <button type="submit" className="btn btn-primary">Login</button>
    </form>
  )
}