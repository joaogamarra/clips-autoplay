import { useCallback, useEffect } from 'react'
import { getClips } from 'src/common/api'
import { setClipIndex, setCurrentClip, updateClips } from 'src/state/reducer'
import { useStateValue } from 'src/state/state'
import { searchType } from 'src/types/search'

const Player: React.FC = () => {
	const [{ clips, currentClip, clipIndex }, dispatch] = useStateValue()

	const playNext = useCallback(() => {
		const clipsData = clips.data
		const newClipIndex = clipIndex + 1
		dispatch(setCurrentClip(clipsData[newClipIndex]))
		dispatch(setClipIndex(newClipIndex))
	}, [clipIndex, clips, dispatch])

	const loadMoreClips = useCallback(async () => {
		const channelId = clips.data[0].broadcaster_name
		const after = clips.pagination.cursor

		const newClips = await getClips(channelId, searchType.channel, after)

		dispatch(updateClips(newClips))
	}, [clips, dispatch])

	useEffect(() => {
		const clipsTotal = clips.data.length

		//Starts the Autoplay if the clips have been set and none has played yet
		if (clipsTotal > 0 && clipIndex === -1) {
			playNext()
		}

		//When there are clips and the currentClip is reaching the last fetch more
		if (clipsTotal > 0 && clipIndex + 3 > clipsTotal) {
			loadMoreClips()
		}
	}, [clips, clipIndex, playNext, loadMoreClips])

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
