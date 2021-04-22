import { useEffect } from 'react'
import { useStateValue } from 'src/state/state'

const Player: React.FC = () => {
	const [{ clips, currentClip, clipIndex }, dispatch] = useStateValue()
	const urlParams = '&parent=localhost&autoplay=true'

	useEffect(() => {
		if (currentClip.embed_url) {
			//console.log(`timeout of ${currentClip.duration * 1000} started`)
		}
	}, [currentClip, clips, dispatch, clipIndex])

	return (
		<>
			{currentClip.embed_url && (
				<iframe
					className='video-iframe'
					title='Twitch Embed'
					frameBorder='0'
					allowFullScreen={true}
					src={`${currentClip.embed_url}${urlParams}`}
					height='378'
					width='620'
				></iframe>
			)}
		</>
	)
}

export default Player
