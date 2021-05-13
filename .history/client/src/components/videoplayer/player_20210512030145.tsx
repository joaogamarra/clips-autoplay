import { FC, useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getClips } from 'src/common/api'
import { setClipIndex, setClips, setCurrentClip, setCurrentSearch, updateClips } from 'src/state/reducer'
import { useStateValue } from 'src/state/state'
import { searchClips } from 'src/types/search'
import { ArrowRightIcon } from '@primer/octicons-react'

import './player.scss'
import Loader from '../common/loader/Loader'

const Player: FC = () => {
	const [{ clips, currentClip, clipIndex, currentSearch }, dispatch] = useStateValue()
	const [transition, setTransition] = useState('loading')
	const params = useParams<searchClips>()

	useEffect(() => {
		console.log('use effect call')
		setTransition('loading')

		const getdata = async () => {
			dispatch(setClipIndex(0))
			dispatch(setCurrentSearch(params))

			const data = await getClips(params)
			dispatch(setClips(data))
			dispatch(setCurrentClip(data.data[0]))
		}

		getdata()

		return () => {
			dispatch(
				setCurrentClip({
					title: '',
					video_url: '',
					comments_url: '',
				})
			)
			setTransition('loading')
		}
	}, [dispatch, params])

	const nextClip = useCallback(
		(direction?: string) => {
			const clipsData = clips.data
			const newClipIndex = direction === 'prev' ? clipIndex - 1 : clipIndex + 1
			setTransition('loading')

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
			{currentClip.video_url && (
				<div className='player-container'>
					<video
						className={transition}
						src={currentClip.video_url}
						autoPlay={true}
						controls={true}
						onEnded={() => nextClip()}
						onLoadedData={() => setTransition('')}
					></video>
					<Loader visible={transition} />
				</div>
			)}
		</>
	)
}

export default Player
