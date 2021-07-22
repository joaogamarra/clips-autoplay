import { FC, useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getClips } from 'src/common/api'
import {
	setClipIndex,
	setClips,
	setClipSeen,
	setCurrentClip,
	setCurrentSearch,
	setFavourites,
	updateClips,
} from 'src/state/reducer'
import { useStateValue } from 'src/state/state'
import { apiTimePeriod, searchClips } from 'src/types/search'
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
import { getRandomInt } from 'src/common/utils'

const Player: FC = () => {
	const [{ clips, currentClip, clipIndex, currentSearch }, dispatch] = useStateValue()
	const [indexUsed, setIndexUsed] = useState<number[]>([])
	const [transition, setTransition] = useState('loading')
	const [error, setError] = useState(false)
	const [finished, setFinished] = useState(false)
	const [videoMaxWidth, setVideoMaxWidth] = useState(1200)
	const [loadingClips, setLoadingClips] = useState(false)
	const [commentsVisible, setCommentsVisible] = useState(true)
	const [nextDisabled, setNextDisabled] = useState(false)
	const [prevDisabled, setPrevDisabled] = useState(true)
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
			dispatch(setCurrentSearch(params))

			const data = await getClips(params)

			if ('error' in data) {
				setError(true)
				setTransition('')
			} else {
				dispatch(setClips(data))
				if (params.timePeriod === apiTimePeriod.shuffle) {
					const randomIndex = getRandomInt(0, data.data.length)
					const clip = data.data[randomIndex]
					dispatch(setCurrentClip(clip))
					dispatch(setClipIndex(randomIndex))
					dispatch(setClipSeen(clip))
					setIndexUsed([randomIndex])
				} else {
					dispatch(setCurrentClip(data.data[0]))
					dispatch(setClipIndex(0))
				}
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

	const nextClip = useCallback(
		(direction?: string) => {
			const clipsData = clips.data
			let newClipIndex = direction === 'prev' ? clipIndex - 1 : clipIndex + 1

			if (direction === 'prev' && clipIndex <= 0 && currentSearch.timePeriod !== apiTimePeriod.shuffle) {
				return false
			}

			if (currentSearch.timePeriod === apiTimePeriod.shuffle) {
				const indexUsedPopped = indexUsed.slice(0, indexUsed.length - 1)

				//increase clips pool
				if (clipsData.length < 21100) {
					loadMoreClips()
				}

				// When going backwards use the previous clips instead of random
				if (direction === 'prev') {
					const indexUsedLength = indexUsed.length
					if (indexUsedLength > 0) {
						const currentIndex = indexUsed.indexOf(clipIndex)
						newClipIndex = indexUsed[currentIndex - 1]
					}
				}
				// If the user went back show the clips ordered instead of grabbing a new random one
				else if (indexUsed.length > 1 && indexUsedPopped.includes(clipIndex)) {
					const currentIndex = indexUsed.indexOf(clipIndex)
					newClipIndex = indexUsed[currentIndex + 1]
				} else {
					const filteredData = clipsData.filter((clip) => !clip.seen)
					if (filteredData.length > 0) {
						const filteredIndex = getRandomInt(0, filteredData.length - 1)
						const filteredClip = filteredData[filteredIndex]
						newClipIndex = clipsData.findIndex((clip) => clip === filteredClip)
						console.log(clipsData.length, newClipIndex)
						setIndexUsed(indexUsed.concat(newClipIndex))
					} else {
						setFinished(true)
						setTransition('')

						return false
					}
				}
			}

			if (newClipIndex + 1 <= clips.data.length) {
				const newClip = clipsData[newClipIndex]
				//Twitch pagination sometimes sends the same clip as the last in the payload and first in the next
				if (clipIndex > 0 && clipsData[clipIndex].video_url === newClip.video_url) {
					nextClip()
				} else {
					setTransition('loading')
					setFinished(false)
					dispatch(setCurrentClip(newClip))
					dispatch(setClipIndex(newClipIndex))
					dispatch(setClipSeen(newClip))
				}
			} else {
				setFinished(true)
				setTransition('')
			}

			if (currentSearch.timePeriod === apiTimePeriod.shuffle) {
				clipsData.length === indexUsed.length ? setNextDisabled(true) : setNextDisabled(false)
				indexUsed.length === 0 || indexUsed[0] === newClipIndex
					? setPrevDisabled(true)
					: setPrevDisabled(false)
			} else {
				clips.data.length <= newClipIndex + 1 ? setNextDisabled(true) : setNextDisabled(false)
				newClipIndex <= 0 ? setPrevDisabled(true) : setPrevDisabled(false)
			}
		},
		[clipIndex, clips.data, currentSearch.timePeriod, dispatch, indexUsed, loadMoreClips]
	)

	useEffect(() => {
		const clipsTotal = clips.data.length

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
									disabled={prevDisabled}
								>
									Previous
									<i className='icon-container'>
										<ChevronRightIcon size={20} />
									</i>
								</button>

								<button
									className='btn-clips-control btn-right'
									onClick={() => nextClip()}
									disabled={nextDisabled}
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
