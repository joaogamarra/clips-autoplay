import { FC, useState } from 'react'
import { MdPlayArrow, MdVolumeUp, MdFullscreen, MdPause } from 'react-icons/md'

interface Props {
	videoEl: HTMLVideoElement | null
	audioEl: HTMLAudioElement | null
	videoPlaying: boolean
	handleVideoPlay: () => void
}

const VideoBottomControls: FC<Props> = ({ videoEl, audioEl, videoPlaying, handleVideoPlay }) => {
	const [playbackSpeed, setPlaybackSpeed] = useState(1)
	const [playbackOptionsVisible, setPlaybackOptionsVisible] = useState(false)

	const handlePlaybackSpeed = (speed: number) => {
		setPlaybackSpeed(speed)
		setPlaybackOptionsVisible(false)
		if (videoEl) {
			videoEl.defaultPlaybackRate = speed
			videoEl.playbackRate = speed
		}
	}

	return (
		<div className='video-bottom-controls'>
			<button className='btn-video-play' onClick={handleVideoPlay}>
				{videoPlaying ? <MdPause></MdPause> : <MdPlayArrow></MdPlayArrow>}
			</button>
			<progress className='video-progress' max='100' value='0'></progress>
			<input type='range' className='video-volume' title='volume' max='1' step='0.1' value='1' />
			<button className='btn-video-mute'>
				<MdVolumeUp></MdVolumeUp>
			</button>
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
			<button className='btn-video-fullscreen'>
				<MdFullscreen></MdFullscreen>
			</button>
		</div>
	)
}

export default VideoBottomControls
