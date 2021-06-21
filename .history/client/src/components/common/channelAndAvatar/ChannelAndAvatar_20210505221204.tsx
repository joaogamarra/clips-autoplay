import { FC } from 'react'
import './channelAndAvatar.scss'

interface Props {
	src: string
	name: string
}

const ChannelAndAvatar: FC<Props> = ({ src, name }) => {
	const parsedSrc = src?.replace('{width}', '50').replace('{height}', '67').replace('300x300', '50x50')

	return (
		<div className='channel-avatar-container'>
			<img className='channel-avatar' width={30} src={parsedSrc} alt={`${name} avatar`} />
			{name}
		</div>
	)
}

export default ChannelAndAvatar