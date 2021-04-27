import { FC, useCallback, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getClips } from 'src/common/api'
import { setClipIndex, setClips, setCurrentClip, setSearchMode, updateClips } from 'src/state/reducer'
import { useStateValue } from 'src/state/state'
import { currentSearch } from 'src/types/search'

const Player: FC = () => {
	const [{ clips, currentClip, clipIndex, currentSearch }, dispatch] = useStateValue()
	const params = useParams<currentSearch>()

	const firstLoad = useCallback(async () => {
		console.log('firstLoad')
		const searchObj: currentSearch = {
			searchMode: params.searchMode,
			searchValue: params.searchValue,
			searchTimePeriod: params.searchTimePeriod,
		}
		const data = await getClips(searchObj)

		dispatch(setClips(data))
		dispatch(setCurrentClip(data.data[0]))
		dispatch(setClipIndex(0))
		dispatch(setSearchMode(searchObj))
	}, [dispatch, params])

	useEffect(() => {
		firstLoad()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

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
		const after = clips.pagination.cursor

		const newClips = await getClips(currentSearch, after)

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
