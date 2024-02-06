import './Banner.css'
import qrcodeimg from '../../assets/qr-code.svg'

type Props = {}

export default function Banner({ }: Props) {
  return (
    <section className="Banner container-fluid text-center">
      <div className="Banner__primary row justify-content-around">
        <div className='col-5'>
          <h2 className='Banner__brand_name'>
            FOSS<br/>
            Front<br/>
            Row
          </h2>
          <h3 className='Banner__brand_slogan'>
            Your Events.<br/>
            Your Tickets.<br/>
            You're in the Front-Row.
          </h3>
        </div>
        <p className='Banner__brand_info col-7'>
          <span className='Banner__text_highlight'>FOSS Front Row</span> is a light-weight and simple ticketing platform solution, intended to service the management of small-scale events
        </p>
        <img className='Banner__bg_img' src={qrcodeimg} />
      </div>
      <div className='Banner__secondary row row-cols-5 justify-content-center'>
        <div className='Banner__card'>
          <div className='card-body'>
            <h6 className="card-title">Simple To Start.</h6>
            <p className="card-text">Light-weight solution, created with ease-of-use in mind.</p>
          </div>
        </div>
        <div className='Banner__card'>
          <div className='card-body'>
            <h6 className="card-title">QR-Code Integration.</h6>
            <p className="card-text">Tickets are generated with QR Codes for easy storage and scanning.</p>
          </div>
        </div>
        <div className='Banner__card'>
          <div className='card-body'>
            <h6 className="card-title">Open-Source.</h6>
            <p className="card-text">Source code is publically available and open for contributions.</p>
          </div>
        </div>
        <div className='Banner__card'>
          <div className='card-body'>
            <h6 className="card-title">Free.</h6>
            <p className="card-text">There are no costs to using this platform.</p>
          </div>
        </div>
        <div className='Banner__card'>
          <div className='card-body'>
            <h6 className="card-title">Self-Hosted Option.</h6>
            <p className="card-text">Use this publically accessible version, or self-host using the source code.</p>
          </div>
        </div>
      </div>
    </section >
  )
}