import React from 'react'
import './Banner.css'

type Props = {}

export default function Banner({ }: Props) {
	return (
		<section className="Banner container-fluid text-center">
			<div className="row justify-content-around" style={{ background: "lightgrey", height: "650px" }}>
				<div className="col-5">
					Lorem ipsum dolor sit.
				</div>
				<div className="col-7">
					Lorem, ipsum dolor.
				</div>
			</div>
			<div className='row row-cols-5 justify-content-center' style={{ background: "yellow", height: "150px" }}>
				<div className=''>
					<div className='card-body'>
						<h6 className="card-title">Lorem, ipsum.</h6>
						<p className="card-text">Lorem, ipsum dolor.</p>
					</div>
				</div>
				<div className='col-2'>
					<div className='card-body'>
						<h6 className="card-title">Lorem, ipsum.</h6>
						<p className="card-text">Lorem, ipsum dolor.</p>
					</div>
				</div>
				<div className=''>
					<div className='card-body'>
						<h6 className="card-title">Lorem, ipsum.</h6>
						<p className="card-text">Lorem, ipsum dolor.</p>
					</div>
				</div>
				<div className=''>
					<div className='card-body'>
						<h6 className="card-title">Lorem, ipsum.</h6>
						<p className="card-text">Lorem, ipsum dolor.</p>
					</div>
				</div>
				<div className=''>
					<div className='card-body'>
						<h6 className="card-title">Lorem, ipsum.</h6>
						<p className="card-text">Lorem, ipsum dolor.</p>
					</div>
				</div>
			</div>
		</section>
	)
}