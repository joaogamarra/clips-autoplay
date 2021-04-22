import { useEffect } from 'react'
import { setClipIndex, setCurrentClip } from 'src/state/reducer'
import { useStateValue } from 'src/state/state'

const Player: React.FC = () => {
	const [{ clips, currentClip, clipIndex }, dispatch] = useStateValue()

	useEffect(() => {
		const clipsData = clips.data
		const clipsTotal = clipsData.length
		const iframeLoad = 2000

		const startAutoPlay = () => {
			console.log(`timeout of ${clipsData[0].duration * 1000} started`)

			setTimeout(() => {
				playNext()
			}, clipsData[0].duration * 1000 + iframeLoad)
		}

		const playNext = () => {
			const newClipIndex = clipIndex + 1
			dispatch(setCurrentClip(clipsData[newClipIndex]))
			dispatch(setClipIndex(newClipIndex))
		}

		if (clipsTotal > 0 && clipIndex === 0) {
			startAutoPlay()
		}

		if (clipIndex > 0 && clipIndex < clipsTotal) {
			playNext()
		}
	}, [currentClip, clips, dispatch, clipIndex])

	return (
		<>
			{currentClip.thumbnail_url && (
				<video
					className='video-iframe'
					title='Twitch Embed'
					src={`${currentClip.thumbnail_url.split('-preview-')[0]}.mp4`}
					height='378'
					width='620'
				></video>
			)}
		</>
	)
}

export default Player
