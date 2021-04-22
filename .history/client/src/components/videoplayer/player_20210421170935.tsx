import { useEffect } from 'react'
import { setClipIndex, setCurrentClip } from 'src/state/reducer'
import { useStateValue } from 'src/state/state'

const Player: React.FC = () => {
	const [{ clips, currentClip, clipIndex }, dispatch] = useStateValue()

	useEffect(() => {
		const clipsData = clips.data
		const clipsTotal = clipsData.length

		const playNext = () => {
			const newClipIndex = clipIndex + 1
			dispatch(setCurrentClip(clipsData[newClipIndex]))
			dispatch(setClipIndex(newClipIndex))
		}

		if (clipsTotal > 0 && clipIndex === 0) {
			playNext()
		}
	}, [currentClip, clips, dispatch, clipIndex])

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
					onEnded={() => console.log('video end')}
				></video>
			)}
		</>
	)
}

export default Player
