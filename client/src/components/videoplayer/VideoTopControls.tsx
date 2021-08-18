import { FC } from 'react'
import { MdChevronRight, MdChatBubble, MdFullscreenExit, MdFullscreen, MdBlock } from 'react-icons/md'
import twitchLogo from '../../assets/logo-twitch.svg'
import { useStateValue } from 'src/state/state'

interface Props {
	handleComments: () => void
	handleNext: () => void
	handlePrev: () => void
	handleInnerFullScreen: () => void
	handleNsfw: () => void
	prevDisabled: boolean
	nextDisabled: boolean
	innerFullScreen: boolean
	nsfw: boolean
}

const VideoTopControls: FC<Props> = ({
	handleComments,
	handleNext,
	handlePrev,
	handleInnerFullScreen,
	handleNsfw,
	innerFullScreen,
	prevDisabled,
	nextDisabled,
	nsfw
}) => {
	const [{ currentClip }] = useStateValue()

	return (
		<div className='video-top-controls'>
			<h4 className='title-lg'>{currentClip.title}</h4>

			<div className='right-container'>
				{currentClip.twitch_url && (
					<a
						className='btn-twitch-page'
						href={`${currentClip.twitch_url}`}
						target='_blank'
						rel='noreferrer'
						title='clip twitch page'
					>
						<img className='' width='30' src={twitchLogo} alt='twitch logo' />
					</a>
				)}
				<button className={`btn-nsfw ${nsfw ? '' : 'hidden'}`} title='toggle nsfw' onClick={handleNsfw}>
					<MdBlock />
					<span className='btn-text'>{nsfw ? 'Hide' : 'Show'} 18+</span>
				</button>

				{currentClip.comments && (
					<button className='btn-comments' title='toggle comments' onClick={handleComments}>
						<MdChatBubble />
					</button>
				)}

				<button className='btn-inner-fullscreen' onClick={handleInnerFullScreen}>
					{innerFullScreen ? <MdFullscreenExit /> : <MdFullscreen />}
				</button>

				<button className='btn-clips-control btn-left' onClick={handlePrev} disabled={prevDisabled}>
					Previous
					<i className='icon-container'>
						<MdChevronRight />
					</i>
				</button>

				<button className='btn-clips-control btn-right' onClick={handleNext} disabled={nextDisabled}>
					Next
					<i className='icon-container'>
						<MdChevronRight />
					</i>
				</button>
			</div>
		</div>
	)
}

export default VideoTopControls
