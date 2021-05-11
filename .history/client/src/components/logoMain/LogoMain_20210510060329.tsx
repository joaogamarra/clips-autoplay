import React, { FC } from 'react'
import { DeviceCameraVideoIcon } from '@primer/octicons-react'
import './logoMain.scss'
import { Link } from 'react-router-dom'

const LogoMain: FC = () => {
	return (
		<>
			<h1 className='logo-main'>
				<Link to='/'>
					Clips <DeviceCameraVideoIcon size={36} /> Autoplay
				</Link>
			</h1>
		</>
	)
}

export default LogoMain
