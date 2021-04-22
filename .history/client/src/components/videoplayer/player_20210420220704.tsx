import { useEffect } from 'react'
import { setCurrentClip } from 'src/state/reducer'
import { useStateValue } from 'src/state/state'

const Player: React.FC = () => {
	const [{ clips, currentClip }, dispatch] = useStateValue()
	const urlParams = '&parent=localhost&autoplay=true'

	useEffect(() => {
		if (currentClip.embed_url) {
			console.log(`timeout of ${currentClip.duration * 1000} started`)
			setTimeout(() => {
				console.log('timeout called')
				dispatch(setCurrentClip(clips.data[1]))
			}, currentClip.duration * 1000)
		}
	}, [currentClip, clips, dispatch])

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
