import { FC, useCallback, useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getClips } from 'src/common/api'
import {
	setClipIndex,
	setClips,
	setClipSeen,
	setCurrentClip,
	setCurrentSearch,
	setFavourites,
	updateClips
} from 'src/state/reducer'
import { useStateValue } from 'src/state/state'
import { apiTimePeriod, searchClips } from 'src/types/search'
import ReactGA from 'react-ga'
import './player.scss'
import 'src/styles/button-generic.scss'
import Loader from '../common/loader/Loader'
import { addFavourite, getFavourites } from 'src/common/localstorage'
import PlayerError from './PlayerError'
import PlayerFinished from './PlayerFinished'
import CommentsBox from './CommentsBox'
import { getRandomInt } from 'src/common/utils'
import VideoTopControls from './VideoTopControls'
import VideoBottomControls from './VideoBottomControls'
import { FullScreen, useFullScreenHandle } from 'react-full-screen'

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
	const [innerFullScreen, setInnerFullScreen] = useState(false)
	const [videoPlaying, setVideoPlaying] = useState(false)
	const [videoPercentage, setVideoPercentage] = useState(0)
	const [videoFullScreen, setVideoFullScreen] = useState(false)
	const [controlsVisible, setControlsVisible] = useState(false)
	const videoEl = useRef<HTMLVideoElement>(null)
	const audioEl = useRef<HTMLAudioElement>(null)
	const videoContainer = useRef<HTMLDivElement>(null)
	const params = useParams<searchClips>()
	const handle = useFullScreenHandle()

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
				setError(false)
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
					comments_url: ''
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

			if (direction === 'prev' && clipIndex <= 0 && currentSearch.timePeriod !== apiTimePeriod.shuffle)
				return false

			if (currentSearch.timePeriod === apiTimePeriod.shuffle) {
				const indexUsedPopped = indexUsed.slice(0, indexUsed.length - 1)
				ReactGA.pageview(`${window.location.pathname}${window.location.search}/${indexUsed.length}`)

				//increase clips pool
				clipsData.length < 1100 && loadMoreClips()

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
					if (currentSearch.timePeriod === apiTimePeriod.shuffle) dispatch(setClipSeen(newClip))

					if (currentSearch.timePeriod !== apiTimePeriod.shuffle) {
						ReactGA.pageview(`${window.location.pathname}${window.location.search}/${newClipIndex}`)
					}
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
				clips.data.length < newClipIndex + 1 ? setNextDisabled(true) : setNextDisabled(false)
				newClipIndex <= 0 ? setPrevDisabled(true) : setPrevDisabled(false)
			}
		},
		[clipIndex, clips.data, currentSearch.timePeriod, dispatch, indexUsed, loadMoreClips]
	)

	useEffect(() => {
		const clipsTotal = clips.data.length

		//When there are clips and the currentClip is reaching the last fetch more
		if (clipsTotal > 0 && clipIndex + 10 > clipsTotal) {
			loadMoreClips()
		}
	}, [clips, clipIndex, nextClip, loadMoreClips])

	const handleVideoPlay = () => {
		if (videoPlaying) {
			videoEl.current?.pause()
			if (audioEl?.current?.src) audioEl.current?.pause()
		} else {
			videoEl.current?.play()
			if (audioEl?.current?.src) audioEl.current?.play()
		}
		setVideoPlaying(!videoPlaying)
	}

	const handleVideoFullScreen = () => {
		if (videoFullScreen) {
			handle.exit()
			setVideoFullScreen(false)
		} else {
			handle.enter()
			setVideoFullScreen(true)
		}
	}

	useEffect(() => {
		const controlsTimeout = setTimeout(() => {
			if (videoPlaying) setControlsVisible(false)
		}, 3000)
		return () => {
			clearTimeout(controlsTimeout)
		}
	}, [controlsVisible, videoPlaying])

	useEffect(() => {
		const updateVideoSize = () => {
			const vh = window.innerHeight
			const vw = window.innerWidth

			if (videoEl && vw > 1000) {
				setVideoMaxWidth((vh - 200) * 1.69)
			}
		}

		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'ArrowLeft') nextClip('prev')
			if (e.key === 'ArrowRight') nextClip()
		}

		updateVideoSize()

		window.onresize = updateVideoSize
		window.onkeydown = handleKeyDown
	}, [nextClip])

	return (
		<FullScreen handle={handle}>
			<div
				ref={videoContainer}
				className={`player-container ${commentsVisible && currentClip.comments ? 'has-comments' : ''} 
				${videoFullScreen && 'is-fullscreen'}
				${innerFullScreen && 'is-inner-fullscreen'}`}
				style={{ maxWidth: videoMaxWidth }}
			>
				{finished && <PlayerFinished />}
				{currentClip.video_url && (
					<>
						<VideoTopControls
							handleComments={() => setCommentsVisible(!commentsVisible)}
							handleNext={() => nextClip()}
							handlePrev={() => nextClip('prev')}
							nextDisabled={nextDisabled}
							prevDisabled={prevDisabled}
							innerFullScreen={innerFullScreen}
							handleInnerFullScreen={() => setInnerFullScreen(!innerFullScreen)}
						/>
						<div className='video-comments-wrapper'>
							{
								<>
									<div
										className={`video-controls-wrapper ${
											!videoPlaying || controlsVisible ? 'controls-visible' : ''
										}`}
									>
										<video
											className={transition}
											src={currentClip.video_url}
											ref={videoEl}
											autoPlay={true}
											onEnded={() => nextClip()}
											onLoadedData={() => setTransition('')}
											onError={() => nextClip()}
											onPlay={() => setVideoPlaying(true)}
											onClick={() => handleVideoPlay()}
											onMouseMove={() => setControlsVisible(true)}
											onTimeUpdate={() =>
												setVideoPercentage((100 / videoEl.current!.duration) * videoEl.current!.currentTime)
											}
										></video>
										<audio ref={audioEl} src={currentClip.audio_url} autoPlay={true} controls={false}></audio>
										<VideoBottomControls
											videoEl={videoEl.current}
											audioEl={audioEl.current}
											handleVideoPlay={() => handleVideoPlay()}
											videoPlaying={videoPlaying}
											videoPercentage={videoPercentage}
											videoFullScreen={videoFullScreen}
											handleVideoFullScreen={handleVideoFullScreen}
											handleMouseMove={() => setControlsVisible(true)}
										/>
									</div>
								</>
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
		</FullScreen>
	)
}

export default Player
