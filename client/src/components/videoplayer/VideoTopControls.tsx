import { FC } from 'react'
import {
	MdChevronRight,
	MdChatBubble,
	MdFullscreenExit,
	MdFullscreen,
	MdBlock,
	MdNewReleases
} from 'react-icons/md'
import twitchLogo from '../../assets/logo-twitch.svg'
import { useStateValue } from 'src/state/state'
import { searchType } from 'src/types/search'

interface Props {
	handleComments: () => void
	handleNext: () => void
	handlePrev: () => void
	handleInnerFullScreen: () => void
	handleNsfw: () => void
	handleFilterSeen: () => void
	prevDisabled: boolean
	nextDisabled: boolean
	innerFullScreen: boolean
	nsfw: boolean
	filterSeen: boolean
}

const VideoTopControls: FC<Props> = ({
	handleComments,
	handleNext,
	handlePrev,
	handleInnerFullScreen,
	handleNsfw,
	handleFilterSeen,
	innerFullScreen,
	prevDisabled,
	nextDisabled,
	nsfw,
	filterSeen
}) => {
	const [{ currentClip, currentSearch }] = useStateValue()

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

				<button
					className={`btn-controls-top btn-filter-seen ${filterSeen ? 'is-active' : ''}`}
					onClick={handleFilterSeen}
				>
					<MdNewReleases />
					<span className='btn-text'>{filterSeen ? 'All Clips' : 'Only New'}</span>
				</button>

				{currentSearch.mode === searchType.subreddit && (
					<button
						className={`btn-controls-top btn-nsfw ${nsfw ? '' : 'is-active'}`}
						title='toggle nsfw'
						onClick={handleNsfw}
					>
						<MdBlock />
						<span className='btn-text'>{nsfw ? 'Hide' : 'Show'} 18+</span>
					</button>
				)}

				{currentClip.comments && (
					<button className='btn-controls-top btn-comments' title='toggle comments' onClick={handleComments}>
						<MdChatBubble />
					</button>
				)}

				<button
					className='btn-controls-top btn-inner-fullscreen'
					title='toggle inner fulscreen'
					onClick={handleInnerFullScreen}
				>
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
