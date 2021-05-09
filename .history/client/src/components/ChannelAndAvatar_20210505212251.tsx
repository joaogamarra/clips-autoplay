import { FC } from 'react'

const ChannelAndAvatar: FC = () => {
	return (
		<>
			<img
				width={30}
				src={suggestion.avatar.replace('{width}', '50').replace('{height}', '67')}
				alt={suggestion.name}
			/>
			{suggestion.name}
		</>
	)
}

export default ChannelAndAvatar
