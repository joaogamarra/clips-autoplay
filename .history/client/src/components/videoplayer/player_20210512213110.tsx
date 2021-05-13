import { FC, useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getClips } from 'src/common/api'
import { setClipIndex, setClips, setCurrentClip, setCurrentSearch, updateClips } from 'src/state/reducer'
import { useStateValue } from 'src/state/state'
import { searchClips } from 'src/types/search'
import { ChevronRightIcon } from '@primer/octicons-react'
import redditLogo from '../../assets/logo-reddit.svg'

import './player.scss'
import Loader from '../common/loader/Loader'

const Player: FC = () => {
	const [{ clips, currentClip, clipIndex, currentSearch }, dispatch] = useStateValue()
	const [transition, setTransition] = useState('loading')
	const params = useParams<searchClips>()

	useEffect(() => {
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
			<div className='player-container'>
				{currentClip.video_url && (
					<>
						<div className='video-controls'>
							<h4 className='title-lg'>{currentClip.title}</h4>

							<div className='right-container'>
								{currentClip.comments_url && (
									<a
										className='link-comments'
										href={`https://reddit.com${currentClip.comments_url}`}
										target='_blank'
										rel='noreferrer'
										title='clip comments'
									>
										<img className='' width='25' src={redditLogo} alt='reddit logo' />
									</a>
								)}
								<button
									className='btn-clips-control btn-left'
									onClick={() => nextClip('prev')}
									disabled={clipIndex <= 0}
								>
									Previous
									<i className='icon-container'>
										<ChevronRightIcon size={20} />
									</i>
								</button>

								<button
									className='btn-clips-control btn-right'
									onClick={() => nextClip()}
									disabled={clips.data.length < clipIndex + 1}
								>
									Next
									<ChevronRightIcon size={20} />
								</button>
							</div>
						</div>

						<video
							className={transition}
							src={currentClip.video_url}
							autoPlay={true}
							controls={true}
							onEnded={() => nextClip()}
							onLoadedData={() => setTransition('')}
						></video>
					</>
				)}
				<Loader visible={transition} />
			</div>
		</>
	)
}

export default Player
