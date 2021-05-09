import { FC } from 'react'

interface Props {
	src: string
	name: string
}

const ChannelAndAvatar: FC<Props> = ({ src, name }) => {
	const parsedSrc = src.replace('{width}', '50').replace('{height}', '67').replace('300x300', '50x50')

	return (
		<>
			<img className='channel-avatar' width={30} src={parsedSrc} alt={`${name} avatar`} />
			{name}
		</>
	)
}

export default ChannelAndAvatar
