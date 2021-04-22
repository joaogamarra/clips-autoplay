import { useEffect } from 'react'
import { useStateValue } from 'src/state/state'

const Player: React.FC = () => {
	const [{ clips, currentClip, clipIndex }, dispatch] = useStateValue()
	const urlParams = '&parent=localhost&autoplay=true'

	useEffect(() => {
		console.log(clipIndex)
		console.log(clips)
		console.log(currentClip)
	}, [clipIndex, clips, currentClip])

	return (
		<>
			{currentClip && (
				<iframe
					className='video-iframe'
					title='Twitch Embed'
					frameBorder='0'
					allowFullScreen={true}
					src={`${currentClip?.embed_url}${urlParams}`}
					height='378'
					width='620'
				></iframe>
			)}
		</>
	)
}

export default Player
