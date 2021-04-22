import { useEffect } from 'react'
import { setClipIndex, setCurrentClip } from 'src/state/reducer'
import { useStateValue } from 'src/state/state'

const Player: React.FC = () => {
	const [{ clips, currentClip, clipIndex }, dispatch] = useStateValue()
	const urlParams = '&parent=localhost&autoplay=true'

	useEffect(() => {
		if (currentClip.embed_url) {
			console.log(`timeout of ${currentClip.duration * 1000} started`)
			const iframeLoad = 2000
			const timer = setTimeout(() => {
				clearTimeout(timer)
				console.log('timeout called')
				const newClipIndex = clipIndex + 1
				dispatch(setCurrentClip(clips.data[newClipIndex]))
				dispatch(setClipIndex(newClipIndex))
			}, currentClip.duration * 1000 + iframeLoad)
		}
	}, [currentClip, clips, dispatch, clipIndex])

	return (
		<>
			<video
				autoPlay
				src='https://production.assets.clips.twitchcdn.net/AT-cm%7C960986723.mp4?sig=9bf3beefdd91a86094c8849eea62e14922467d94&token=%7B%22authorization%22%3A%7B%22forbidden%22%3Afalse%2C%22reason%22%3A%22%22%7D%2C%22clip_uri%22%3A%22%22%2C%22device_id%22%3A%22SrTr72p6nNHzYwxlM36BTdRhGzC4uDYP%22%2C%22expires%22%3A1619034786%2C%22user_id%22%3A%2276875038%22%2C%22version%22%3A2%7D'
			></video>
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
