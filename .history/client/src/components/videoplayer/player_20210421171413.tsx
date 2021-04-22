import { useCallback, useEffect } from 'react'
import { setClipIndex, setCurrentClip } from 'src/state/reducer'
import { useStateValue } from 'src/state/state'

const Player: React.FC = () => {
	const [{ clips, currentClip, clipIndex }, dispatch] = useStateValue()

	const playNext = useCallback(() => {
		const clipsData = clips.data
		const newClipIndex = clipIndex + 1
		dispatch(setCurrentClip(clipsData[newClipIndex]))
		dispatch(setClipIndex(newClipIndex))
	}, [clipIndex, clips.data, dispatch])

	useEffect(() => {
		const clipsTotal = clips.data.length

		if (clipsTotal > 0 && clipIndex === 0) {
			playNext()
		}
	}, [clips, clipIndex, playNext])

	return (
		<>
			{currentClip.thumbnail_url && (
				<video
					className='video'
					title='Twitch Embed'
					autoPlay={true}
					src={`${currentClip.thumbnail_url.split('-preview-')[0]}.mp4`}
					height='378'
					width='620'
					onEnded={() => playNext()}
				></video>
			)}
		</>
	)
}

export default Player
