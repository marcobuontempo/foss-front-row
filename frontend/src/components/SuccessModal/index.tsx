import { faSquareCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { ReactNode } from 'react'
import Modal from 'react-modal'
import './SuccessModal.css'

type Props = {
  children?: ReactNode;
  isOpen: boolean;
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

const customStyle: Modal.Styles = {
  content: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '40px',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  overlay: {
    zIndex: 2147483647,
  }
}


export default function SuccessModal({
  children,
  isOpen,
  setIsOpen,
}: Props) {

  const closeModal = () => {
    if (setIsOpen) {
      setIsOpen(false);
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      style={customStyle}
      contentLabel="Success Modal"
      onRequestClose={closeModal}
    >
      <FontAwesomeIcon className='SuccessModal__checkmark' icon={faSquareCheck} />
      <br />
      {children}
      {
        setIsOpen &&
        <button type='button' onClick={closeModal}>Close</button>
      }
    </Modal>
  )
}