import { useEffect } from 'react'
import { setClipIndex, setCurrentClip } from 'src/state/reducer'
import { useStateValue } from 'src/state/state'

const Player: React.FC = () => {
	const [{ clips, currentClip, clipIndex }, dispatch] = useStateValue()
	const urlParams = '&parent=localhost&autoplay=true'

	useEffect(() => {
		console.log('file: player.tsx ~ line 7 ~ currentClip', currentClip)
		console.log('file: player.tsx ~ line 7 ~ clips', clips)
		console.log('file: player.tsx ~ line 7 ~ clipIndex', clipIndex)

		if (currentClip.embed_url) {
			console.log(`timeout of ${currentClip.duration * 1000} started`)
			const iframeLoad = 2000
			const timer = setTimeout(() => {
				clearTimeout(timer)
				console.log('timeout called' + currentClip.duration * 1000 + iframeLoad)
				const newClipIndex = clipIndex + 1
				dispatch(setCurrentClip(clips.data[newClipIndex]))
				dispatch(setClipIndex(newClipIndex))
			}, currentClip.duration * 1000 + iframeLoad)
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
