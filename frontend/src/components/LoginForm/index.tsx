import React, { ChangeEvent, FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './LoginForm.css'
import { loginUser } from '@services/api.ts';
import { onLoginSuccess } from '@services/authService';
import Modal from 'react-modal';
import SuccessModal from '@components/SuccessModal';

type Props = {}

Modal.setAppElement("#root");

export default function LoginForm({ }: Props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const navigate = useNavigate();

  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target?.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target?.value);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Form submission logic
    await loginUser({ username, password })
      .then(response => {
        // Overlay modal
        setModalIsOpen(true);

        // Redirect after 3 seconds...
        setTimeout(() => {
          // Store user info in local storage
          onLoginSuccess(response.data);

          // Redirect to homepage...
          navigate('/');
        }, 2000);

      })
      .catch(error => {
        // console.log(error);
      })
  };

  return (
    <form className='LoginForm container-sm py-3 text-center' onSubmit={handleSubmit}>
      <h1>Login</h1>

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

      <SuccessModal isOpen={modalIsOpen}>
        Login Successful!<br />
        Redirecting to home...
      </SuccessModal>
    </form>
  )
}