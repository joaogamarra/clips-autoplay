import { FC } from 'react'
import './channelAndAvatar.scss'

interface Props {
	src: string
	name: string
}

const ChannelAndAvatar: FC<Props> = ({ src, name }) => {
	const parsedSrc = src?.replace('{width}', '50').replace('{height}', '67').replace('300x300', '50x50')
	const defaultAvatar =
		'https://static-cdn.jtvnw.net/user-default-pictures-uv/cdd517fe-def4-11e9-948e-784f43822e80-profile_image-70x70.png'

	const errorHandler = (e: any) => {
		e.target.src = defaultAvatar
	}

	return (
		<div className='channel-avatar-container'>
			<img
				className='channel-avatar'
				width={30}
				src={parsedSrc !== undefined && parsedSrc !== '' ? parsedSrc : defaultAvatar}
				alt={`${name} avatar`}
				onError={(e) => errorHandler(e)}
			/>
			{name}
		</div>
	)
}

export default ChannelAndAvatar
