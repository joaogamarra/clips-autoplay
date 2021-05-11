import React, { FC } from 'react'
import { DeviceCameraVideoIcon } from '@primer/octicons-react'
import './logoMain.scss'

const LogoMain: FC = () => {
	return (
		<>
			<h1 className='logo-main'>
				Clips <DeviceCameraVideoIcon size={32} /> Autoplay
			</h1>
		</>
	)
}

export default LogoMain
