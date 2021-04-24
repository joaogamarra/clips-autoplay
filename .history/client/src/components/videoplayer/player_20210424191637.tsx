import { useCallback, useEffect } from 'react'
import { useParams } from 'react-router'
import { getClips } from 'src/common/api'
import { setClipIndex, setCurrentClip, updateClips } from 'src/state/reducer'
import { useStateValue } from 'src/state/state'
import { searchType } from 'src/types/search'

const Player: React.FC = () => {
	const [{ clips, currentClip, clipIndex, currentSearch }, dispatch] = useStateValue()
	const pageId = useParams()

	if (clips.data.length === 0) {
		const firstLoad = async () => {
			console.log(pageId)
		}

		firstLoad()
	}

	const nextClip = useCallback(
		(direction?: string) => {
			const clipsData = clips.data
			const newClipIndex = direction === 'prev' ? clipIndex - 1 : clipIndex + 1

			dispatch(setCurrentClip(clipsData[newClipIndex]))
			dispatch(setClipIndex(newClipIndex))
		},
		[clipIndex, clips, dispatch]
	)

	const loadMoreClips = useCallback(async () => {
		console.log('loadmore')
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
					<video
						className='video'
						autoPlay={true}
						controls={true}
						src={`${currentClip.thumbnail_url.split('-preview-')[0]}.mp4`}
						height='378'
						width='620'
						onEnded={() => nextClip()}
					></video>
					<br />
					{clips.data.length > 0 && clipIndex > 0 && (
						<button onClick={() => nextClip('prev')}>Previous Clip</button>
					)}
					{clips.data.length > clipIndex + 1 && <button onClick={() => nextClip()}>Next Clip</button>}
				</>
			)}
		</>
	)
}

export default Player
