import { FC } from 'react'
import { searchType } from 'src/types/search'
import './channelAndAvatar.scss'
import logoReddit from '../../../assets/reddit-avatar.svg'

interface Props {
	src: string
	name: string
	type?: searchType
}

const ChannelAndAvatar: FC<Props> = ({ src, name, type }) => {
	const parsedSrc = src?.replace('{width}', '50').replace('{height}', '67').replace('300x300', '50x50')
	const defaultAvatarReddit = logoReddit
	let defaultAvatar =
		'https://static-cdn.jtvnw.net/user-default-pictures-uv/cdd517fe-def4-11e9-948e-784f43822e80-profile_image-70x70.png'

	type === searchType.subreddit && (defaultAvatar = defaultAvatarReddit)

	const errorHandler = (e: any) => {
		e.target.src = defaultAvatar
	}

	return (
		<div className='channel-avatar-container'>
			<img
				className={'channel-avatar'}
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
