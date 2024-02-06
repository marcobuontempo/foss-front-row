import './Footer.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileLines } from '@fortawesome/free-regular-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'


type Props = {}

export default function Footer({ }: Props) {
  return (
    <footer className="Footer d-flex w-100 justify-content-between align-items-center px-3">
      <p className='Footer__element Footer__first'>Marco Buontempo (2023-{new Date().getFullYear()})</p>
      <p className='Footer__element Footer__center'><FontAwesomeIcon icon={faFileLines} /> Apache License 2.0</p>
      <p className='Footer__element Footer__last'><a className='Footer__link' href="https://github.com/marcobuontempo/foss-front-row" target="_blank">Github <FontAwesomeIcon icon={faGithub} /></a></p>
    </footer>
  )
}

