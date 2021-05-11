import React, { FC } from 'react'
import { DeviceCameraVideoIcon } from '@primer/octicons-react'
import './logoMain.scss'

const LogoMain: FC = () => {
	return (
		<>
			<h1 className='logo-main'>
				Clips <br></br>
				<DeviceCameraVideoIcon size={36} /> <br></br>Autoplay
			</h1>
		</>
	)
}

export default LogoMain
