import React, { FC } from 'react'
import { DeviceCameraVideoIcon } from '@primer/octicons-react'
import './logoMain.scss'
import { Link } from 'react-router-dom'

const LogoMain: FC = () => {
	return (
		<>
			<h1 className='logo-main'>
				<Link to='/'>
					clips <DeviceCameraVideoIcon size={36} /> autoplay
				</Link>
			</h1>
		</>
	)
}

export default LogoMain
