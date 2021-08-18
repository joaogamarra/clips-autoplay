import { FC, useEffect, useRef, useState } from 'react'
import {
	MdPlayArrow,
	MdVolumeUp,
	MdFullscreen,
	MdPause,
	MdVolumeDown,
	MdVolumeOff,
	MdFullscreenExit
} from 'react-icons/md'
import { getUserOptions, saveUserOptions } from 'src/common/localstorage'
import { storageOptions } from 'src/types/options'

interface Props {
	videoEl: HTMLVideoElement | null
	audioEl: HTMLAudioElement | null
	videoPlaying: boolean
	videoPercentage: number
	videoFullScreen: boolean
	hasAudio: boolean
	handleVideoFullScreen: () => void
	handleVideoPlay: () => void
	handleMouseMove: () => void
}

const VideoBottomControls: FC<Props> = ({
	videoEl,
	audioEl,
	videoPlaying,
	videoPercentage,
	videoFullScreen,
	hasAudio,
	handleVideoFullScreen,
	handleVideoPlay,
	handleMouseMove
}) => {
	const [playbackSpeed, setPlaybackSpeed] = useState(1)
	const [playbackOptionsVisible, setPlaybackOptionsVisible] = useState(false)
	const [videoMuted, setVideoMuted] = useState(false)
	const [videoVolume, setVideoVolume] = useState(5)
	const [progressPosition, setProgressPosition] = useState(0)
	const VolumeEl = useRef<HTMLInputElement>(null)
	const progressEl = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const savedOptions: storageOptions = getUserOptions()

		setVideoVolume(savedOptions.volume)
		setPlaybackSpeed(savedOptions.playbackSpeed)
	}, [])

	useEffect(() => {
		const savedOptions: storageOptions = getUserOptions()
		saveUserOptions({
			...savedOptions,
			playbackSpeed: playbackSpeed
		})
		setPlaybackOptionsVisible(false)
		if (videoEl) {
			videoEl.defaultPlaybackRate = playbackSpeed
			videoEl.playbackRate = playbackSpeed
		}
		if (audioEl?.src) {
			audioEl.defaultPlaybackRate = playbackSpeed
			audioEl.playbackRate = playbackSpeed
		}
	}, [audioEl, playbackSpeed, videoEl])

	const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
		const percent = e.nativeEvent.offsetX / e.currentTarget.offsetWidth
		//console.log(e.nativeEvent.offsetX, e.currentTarget.offsetWidth, percent)
		if (videoEl) videoEl.currentTime = percent * videoEl.duration
		if (audioEl?.src) audioEl.currentTime = percent * audioEl.duration
	}

	const toggleSound = () => {
		const muted = !videoMuted
		setVideoMuted(muted)
		if (audioEl?.src) {
			audioEl.muted = muted
			if (!muted && videoVolume === 0) {
				audioEl.volume = 0.2
			}
		} else if (videoEl) {
			videoEl.muted = muted
			if (!muted && videoVolume === 0) {
				videoEl.volume = 0.2
				setVideoVolume(2)
			}
		}
	}

	useEffect(() => {
		//console.log(videoPercentage)
		if (progressEl.current) {
			const width = progressEl.current.clientWidth
			setProgressPosition(width * (videoPercentage / 100))
		}
	}, [videoPercentage])

	useEffect(() => {
		const el = VolumeEl.current
		if (el) {
			const min = Number(el.min)
			const max = Number(el.max)
			const val = Number(el.value)
			el.style.backgroundSize = ((val - min) * 100) / (max - min) + '% 100%'
		}
	}, [videoVolume])

	useEffect(() => {
		const savedOptions: storageOptions = getUserOptions()
		saveUserOptions({
			...savedOptions,
			volume: videoVolume
		})

		if (audioEl?.src) audioEl.volume = videoVolume / 10
		else if (videoEl) videoEl.volume = videoVolume / 10
	}, [audioEl, videoEl, videoVolume])

	return (
		<div className='video-bottom-controls' onMouseMove={handleMouseMove}>
			<button className='btn-video-play' onClick={handleVideoPlay}>
				{videoPlaying ? <MdPause /> : <MdPlayArrow />}
			</button>
			<div ref={progressEl} className='video-progress-container' onClick={(e) => handleSeek(e)}>
				<div className='video-progress' style={{ transform: `scaleX(${videoPercentage / 100})` }}></div>
				<div
					className='video-progress-point'
					style={{ transform: `translateX(${progressPosition}px)` }}
				></div>
			</div>

			{hasAudio && (
				<>
					<button className='btn-video-mute' onClick={() => toggleSound()}>
						{videoMuted ? <MdVolumeOff /> : videoVolume > 4 ? <MdVolumeUp /> : <MdVolumeDown />}
					</button>
					<input
						ref={VolumeEl}
						type='range'
						className='video-volume'
						title='volume'
						min='0'
						max='10'
						step='0.1'
						value={videoVolume}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
							setVideoVolume(Number(e.currentTarget.value))
						}
					/>
				</>
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
						<button onClick={() => setPlaybackSpeed(2)}>2</button>
					</li>
					<li>
						<button onClick={() => setPlaybackSpeed(1.5)}>1.5</button>
					</li>
					<li>
						<button onClick={() => setPlaybackSpeed(1.25)}>1.25</button>
					</li>
					<li>
						<button onClick={() => setPlaybackSpeed(1)}>1</button>
					</li>
					<li>
						<button onClick={() => setPlaybackSpeed(0.5)}>0.5</button>
					</li>
				</ul>
			</div>
			<button className='btn-video-fullscreen' onClick={handleVideoFullScreen}>
				{videoFullScreen ? <MdFullscreenExit /> : <MdFullscreen />}
			</button>
		</div>
	)
}

export default VideoBottomControls
