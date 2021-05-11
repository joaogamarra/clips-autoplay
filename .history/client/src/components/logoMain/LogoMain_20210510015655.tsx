import React, { FC } from 'react'
import { VideoIcon } from '@primer/octicons-react'

const LogoMain: FC = () => {
	return (
		<>
			<h1 className='logo-main'>
				Clips <VideoIcon size={24} /> Autoplay
			</h1>
		</>
	)
}

export default LogoMain
