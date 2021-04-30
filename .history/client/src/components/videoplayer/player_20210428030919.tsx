import { FC, useCallback, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getClips } from 'src/common/api'
import { setClipIndex, setClips, setCurrentClip, setCurrentSearch, updateClips } from 'src/state/reducer'
import { useStateValue } from 'src/state/state'
import { searchClips } from 'src/types/search'

const Player: FC = () => {
	const [{ clips, currentClip, clipIndex, currentSearch }, dispatch] = useStateValue()
	const params = useParams<searchClips>()

	console.log(params)

	const firstLoad = useCallback(async () => {
		console.log('first load')
		const data = await getClips(params)

		dispatch(setClips(data))
		dispatch(setCurrentClip(data.data[0]))
		dispatch(setClipIndex(0))
		dispatch(setCurrentSearch(params))
	}, [dispatch, params])

	useEffect(() => {
		firstLoad()
	}, [params, firstLoad])

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
					<iframe
						title='video-embed'
						src={`${currentClip.embed_url}&parent=localhost&autoplay=true`}
						width='600'
						height='400'
						allowFullScreen={true}
					></iframe>
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
