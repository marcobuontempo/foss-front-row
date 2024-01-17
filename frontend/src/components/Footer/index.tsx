import React from 'react'
import './Footer.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileLines } from '@fortawesome/free-regular-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'


type Props = {}

export default function Footer({ }: Props) {
  return (
    <footer className="Footer d-flex w-100 justify-content-between px-3">
      <p style={{ flex: 1, textAlign: 'left' }}>Marco Buontempo (2023-{new Date().getFullYear()})</p>
      <p style={{ flex: 1, textAlign: 'center' }}><FontAwesomeIcon icon={faFileLines} /> Apache License 2.0</p>
      <p style={{ flex: 1, textAlign: 'right' }}><a href="https://github.com/marcobuontempo/ticket-ecomm" target="_blank"><FontAwesomeIcon icon={faGithub} /></a></p>
    </footer>
  )
}

