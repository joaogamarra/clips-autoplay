import React, { FC } from 'react'
import './logoMain.scss'
import { Link } from 'react-router-dom'
import { BsCameraVideo } from 'react-icons/bs'

const LogoMain: FC = () => {
	return (
		<>
			<h1 className='logo-main'>
				<Link to='/'>
					Clips <BsCameraVideo /> Autoplay
				</Link>
			</h1>
		</>
	)
}

export default LogoMain
