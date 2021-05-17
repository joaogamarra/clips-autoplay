import { FC, useCallback, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getClips } from 'src/common/api'
import { setClipIndex, setClips, setCurrentClip, setCurrentSearch, updateClips } from 'src/state/reducer'
import { useStateValue } from 'src/state/state'
import { searchClips } from 'src/types/search'
import { ChevronRightIcon, XIcon } from '@primer/octicons-react'
import redditLogo from '../../assets/logo-reddit.svg'

import './player.scss'
import 'src/styles/button-generic.scss'

import Loader from '../common/loader/Loader'

const Player: FC = () => {
	const [{ clips, currentClip, clipIndex, currentSearch }, dispatch] = useStateValue()
	const [transition, setTransition] = useState('loading')
	const [error, setError] = useState(false)
	const params = useParams<searchClips>()

	useEffect(() => {
		setTransition('loading')

		const getdata = async () => {
			dispatch(setClipIndex(0))
			dispatch(setCurrentSearch(params))

			const data = await getClips(params)

			if ('error' in data) {
				setError(true)
				setTransition('')
			} else {
				dispatch(setClips(data))
				dispatch(setCurrentClip(data.data[0]))
			}
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

			console.log(clipIndex, clips.data.length)
			if (!direction && clipIndex < clips.data.length) {
				setTransition('loading')

				dispatch(setCurrentClip(clipsData[newClipIndex]))
				dispatch(setClipIndex(newClipIndex))
			}
		},
		[clipIndex, clips, dispatch]
	)

	const loadMoreClips = useCallback(async () => {
		const after = clips.pagination.cursor
		if (after) {
			const data = await getClips(currentSearch, after)

			if ('error' in data) {
				console.log(data.error)
			} else {
				dispatch(updateClips(data))
			}
		}
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
									<i className='icon-container'>
										<ChevronRightIcon size={20} />
									</i>
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
				{error && (
					<div className='error-container'>
						<XIcon size={48} />
						<p className='error-description'>
							We couldn't find any clips for your Search.
							<br />
							The game/user might not exist or they might not have any clips in the selected period.
							<br /> Users that are currently suspended also have their clips disabled.
						</p>
						<Link to='/' className='button-generic'>
							New Search
						</Link>
					</div>
				)}
				<Loader visible={transition} />
			</div>
		</>
	)
}

export default Player
