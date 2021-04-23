import { ReactEventHandler, useCallback, useEffect } from 'react'
import { getClips } from 'src/common/api'
import { setClipIndex, setCurrentClip, updateClips } from 'src/state/reducer'
import { useStateValue } from 'src/state/state'
import { searchType } from 'src/types/search'

const Player: React.FC = () => {
	const [{ clips, currentClip, clipIndex, currentSearch }, dispatch] = useStateValue()

	const nextClip = useCallback(
		() => {
			console.log('call')
			const clipsData = clips.data
		const newClipIndex = clipIndex + 1

			dispatch(setCurrentClip(clipsData[newClipIndex]))
			dispatch(setClipIndex(newClipIndex))
		},
		[clipIndex, clips, dispatch]
	)

	const loadMoreClips = useCallback(async () => {
		const after = clips.pagination.cursor
		let queryId = clips.data[0].broadcaster_name

		if (currentSearch.mode === searchType.category) {
			queryId = currentSearch.value
		}

		const newClips = await getClips(queryId, currentSearch, after)

		dispatch(updateClips(newClips))
	}, [clips, currentSearch, dispatch])

	useEffect(() => {
		const clipsTotal = clips.data.length

		//Starts the Autoplay if the clips have been set and none has played yet
		if (clipsTotal > 0 && clipIndex === -1) {
			nextClip()
		}

		//When there are clips and the currentClip is reaching the last fetch more
		if (clipsTotal > 0 && clipIndex + 3 > clipsTotal) {
			loadMoreClips()
		}
	}, [clips, clipIndex, nextClip, loadMoreClips])

	return (
		<>
			{currentClip.thumbnail_url && (
				<>
					{clips.data.length > 0 && clipIndex > 0 && (
						<button onClick={() => nextClip()}>Previous Clip</button>
					)}
					<video
						className='video'
						autoPlay={true}
						controls={true}
						src={`${currentClip.thumbnail_url.split('-preview-')[0]}.mp4`}
						height='378'
						width='620'
						onEnded={nextClip}
					></video>
					{clips.data.length > clipIndex + 1 && <button onClick={() => nextClip())}>Next Clip</button>}
				</>
			)}
		</>
	)
}

export default Player
