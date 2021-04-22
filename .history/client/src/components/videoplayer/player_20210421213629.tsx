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
	}, [clipIndex, clips, dispatch])

	useEffect(() => {
		const clipsTotal = clips.data.length

		//Starts the Autoplay if the clips have been set and none has played yet
		if (clipsTotal > 0 && clipIndex === -1) {
			playNext()
		}

		//When there are clips and the currentClip is reaching the last fetch more
		if (clipsTotal > 0 && clipIndex + 3 > clipsTotal) {
			console.log('go load more')
		}
	}, [clips, clipIndex, playNext])

	return (
		<>
			{currentClip.thumbnail_url && (
				<>
					{clips.data.length > 0 && <button onClick={playNext}>Previous Clip</button>}
					<video
						className='video'
						autoPlay={true}
						controls={true}
						src={`${currentClip.thumbnail_url.split('-preview-')[0]}.mp4`}
						height='378'
						width='620'
						onEnded={playNext}
					></video>
					{clips.data.length > clipIndex + 1 && <button onClick={playNext}>Next Clip</button>}
				</>
			)}
		</>
	)
}

export default Player
