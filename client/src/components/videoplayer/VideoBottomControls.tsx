import { FC, useEffect, useRef, useState } from 'react'
import {
	MdPlayArrow,
	MdVolumeUp,
	MdFullscreen,
	MdPause,
	MdVolumeMute,
	MdFullscreenExit
} from 'react-icons/md'

interface Props {
	videoEl: HTMLVideoElement | null
	audioEl: HTMLAudioElement | null
	videoPlaying: boolean
	videoPercentage: number
	videoFullScreen: boolean
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

	const handlePlaybackSpeed = (speed: number) => {
		setPlaybackSpeed(speed)
		setPlaybackOptionsVisible(false)
		if (videoEl) {
			videoEl.defaultPlaybackRate = speed
			videoEl.playbackRate = speed
		}
		if (audioEl?.src) {
			audioEl.defaultPlaybackRate = speed
			audioEl.playbackRate = speed
		}
	}

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
			muted ? setVideoVolume(0) : setVideoVolume(audioEl.volume * 10)
			audioEl.muted = muted
			if (!muted && videoVolume === 0) {
				audioEl.volume = 0.2
			}
		} else if (videoEl) {
			muted ? setVideoVolume(0) : setVideoVolume(videoEl.volume * 10)
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

	const handleVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
		const target = e.currentTarget
		const val = Number(target.value)
		setVideoVolume(val)

		if (val === 0 && !videoMuted) setVideoMuted(true)
		else setVideoMuted(false)

		if (audioEl?.src) audioEl.volume = val / 10
		else if (videoEl) videoEl.volume = val / 10
	}

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
			<button className='btn-video-mute' onClick={() => toggleSound()}>
				{videoMuted ? <MdVolumeMute /> : <MdVolumeUp />}
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
				onChange={handleVolume}
			/>
			<div className='playback-speed-container'>
				<button
					onClick={() => setPlaybackOptionsVisible(!playbackOptionsVisible)}
					className='btn-playback-speed'
				>
					{playbackSpeed}x
				</button>
				<ul className={`playback-options ${playbackOptionsVisible ? 'is-visible' : ''}`}>
					<li>
						<button onClick={() => handlePlaybackSpeed(2)}>2</button>
					</li>
					<li>
						<button onClick={() => handlePlaybackSpeed(1.5)}>1.5</button>
					</li>
					<li>
						<button onClick={() => handlePlaybackSpeed(1.25)}>1.25</button>
					</li>
					<li>
						<button onClick={() => handlePlaybackSpeed(1)}>1</button>
					</li>
					<li>
						<button onClick={() => handlePlaybackSpeed(0.5)}>0.5</button>
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
