import React, { FC } from 'react'
import { DeviceCameraVideoIcon } from '@primer/octicons-react'

const LogoMain: FC = () => {
	return (
		<>
			<h1 className='logo-main'>
				Clips <DeviceCameraVideoIcon size={24} /> Autoplay
			</h1>
		</>
	)
}

export default LogoMain
