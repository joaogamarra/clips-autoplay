import { FC, useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getClips } from 'src/common/api'
import {
	setClipIndex,
	setClips,
	setCurrentClip,
	setCurrentSearch,
	setFavourites,
	updateClips,
} from 'src/state/reducer'
import { useStateValue } from 'src/state/state'
import { searchClips } from 'src/types/search'
import { ChevronRightIcon, CommentIcon, ScreenFullIcon } from '@primer/octicons-react'
import twitchLogo from '../../assets/logo-twitch.svg'
import ReactGA from 'react-ga'

import './player.scss'
import 'src/styles/button-generic.scss'

import Loader from '../common/loader/Loader'
import { addFavourite, getFavourites } from 'src/common/localstorage'
import PlayerError from './PlayerError'
import PlayerFinished from './PlayerFinished'
import CommentsBox from './CommentsBox'

const Player: FC = () => {
	const [{ clips, currentClip, clipIndex, currentSearch }, dispatch] = useStateValue()
	const [transition, setTransition] = useState('loading')
	const [error, setError] = useState(false)
	const [finished, setFinished] = useState(false)
	const [videoMaxWidth, setVideoMaxWidth] = useState(1200)
	const [loadingClips, setLoadingClips] = useState(false)
	const [commentsVisible, setCommentsVisible] = useState(true)
	const [playbackSpeed, setPlaybackSpeed] = useState(1)
	const [playbackOptionsVisible, setPlaybackOptionsVisible] = useState(false)
	const [fullscreen, setFullscreen] = useState(false)
	const params = useParams<searchClips>()

	useEffect(() => {
		ReactGA.pageview(window.location.pathname + window.location.search)
	}, [params])

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
				setFinished(false)
				await addFavourite(params)
				const favouritesRes = await getFavourites()

				dispatch(setFavourites(favouritesRes))
			}
		}

		getdata()

		return () => {
			dispatch(
				setCurrentClip({
					title: '',
					video_url: '',
					twitch_url: '',
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

			if (direction === 'prev' && clipIndex <= 0) {
				return false
			}

			if (newClipIndex + 1 <= clips.data.length) {
				//Twitch pagination sometimes sends the same clip as the last in the payload and first in the next
				if (clipsData[clipIndex].video_url === clipsData[newClipIndex].video_url) {
					nextClip()
				} else {
					setTransition('loading')
					setFinished(false)

					dispatch(setCurrentClip(clipsData[newClipIndex]))
					dispatch(setClipIndex(newClipIndex))
				}
			} else {
				setFinished(true)
				setTransition('')
			}
		},
		[clipIndex, clips, dispatch]
	)

	const loadMoreClips = useCallback(async () => {
		const after = clips.pagination.cursor
		if (after !== '' && !loadingClips) {
			setLoadingClips(true)
			const data = await getClips(currentSearch, after)

			if ('error' in data) {
				console.log(data.error)
			} else {
				dispatch(updateClips(data))
				setLoadingClips(false)
			}
		}
	}, [clips.pagination.cursor, currentSearch, dispatch, loadingClips])

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

	const handlePlaybackSpeed = (speed: number) => {
		const video = document.querySelector('.player-container video') as HTMLMediaElement
		setPlaybackSpeed(speed)
		setPlaybackOptionsVisible(false)
		if (video) {
			video.defaultPlaybackRate = speed
			video.playbackRate = speed
		}
	}

	useEffect(() => {
		const updateVideoSize = () => {
			const video = document.querySelector('.player-container video')
			const vh = window.innerHeight
			const vw = window.innerWidth

			if (video && vw > 1000) {
				setVideoMaxWidth((vh - 200) * 1.69)
			}
		}

		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'ArrowLeft') {
				nextClip('prev')
			}

			if (e.key === 'ArrowRight') {
				nextClip()
			}
		}

		updateVideoSize()

		window.onresize = updateVideoSize
		window.onkeydown = handleKeyDown
	}, [nextClip])

	return (
		<>
			<div
				className={`player-container ${commentsVisible && currentClip.comments ? 'has-comments' : ''} ${
					fullscreen ? 'is-fullscreen' : ''
				}`}
				style={{ maxWidth: videoMaxWidth }}
			>
				{finished && <PlayerFinished />}
				{currentClip.video_url && (
					<>
						<div className='video-controls'>
							<h4 className='title-lg'>{currentClip.title}</h4>

							<div className='right-container'>
								{currentClip.twitch_url && (
									<a
										className='link-twitch'
										href={`${currentClip.twitch_url}`}
										target='_blank'
										rel='noreferrer'
										title='clip twitch page'
									>
										<img className='' width='25' src={twitchLogo} alt='twitch logo' />
									</a>
								)}

								<button
									className='toggle-fullscreen'
									title='toggle fullscreen'
									onClick={() => setFullscreen(!fullscreen)}
								>
									<ScreenFullIcon size={20} />
								</button>

								{currentClip.comments && (
									<button
										className='toggle-comments'
										title='toggle comments'
										onClick={() => setCommentsVisible(!commentsVisible)}
									>
										<CommentIcon size={20} />
									</button>
								)}
								<div className='playback-speed-container'>
									<button
										onClick={() => setPlaybackOptionsVisible(!playbackOptionsVisible)}
										className='btn-playback-speed'
									>
										{playbackSpeed}x
									</button>
									<ul className={`playback-options ${playbackOptionsVisible ? 'is-visible' : ''}`}>
										<li>
											<button onClick={() => handlePlaybackSpeed(0.5)}>0.5x</button>
										</li>
										<li>
											<button onClick={() => handlePlaybackSpeed(1)}>1x</button>
										</li>
										<li>
											<button onClick={() => handlePlaybackSpeed(1.25)}>1.25x</button>
										</li>
										<li>
											<button onClick={() => handlePlaybackSpeed(1.5)}>1.5x</button>
										</li>
										<li>
											<button onClick={() => handlePlaybackSpeed(2)}>2x</button>
										</li>
									</ul>
								</div>

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
									disabled={clips.data.length <= clipIndex + 1}
								>
									Next
									<i className='icon-container'>
										<ChevronRightIcon size={20} />
									</i>
								</button>
							</div>
						</div>
						<div className='video-comments-wrapper'>
							{
								<video
									className={transition}
									src={currentClip.video_url}
									autoPlay={true}
									controls={true}
									onEnded={() => nextClip()}
									onLoadedData={() => setTransition('')}
									onError={() => nextClip()}
								></video>
							}

							{currentClip.comments && transition !== 'loading' ? (
								<CommentsBox currentClip={currentClip}></CommentsBox>
							) : null}
						</div>
					</>
				)}
				{error && <PlayerError />}

				<Loader visible={transition} />
			</div>
		</>
	)
}

export default Player
