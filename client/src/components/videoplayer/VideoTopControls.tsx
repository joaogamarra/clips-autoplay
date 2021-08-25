import { FC, useState } from 'react'
import {
	MdChevronRight,
	MdChatBubble,
	MdFullscreenExit,
	MdFullscreen,
	MdBlock,
	MdNewReleases,
	MdSettings
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
	const [settingsVisible, setSettingsVisible] = useState(false)

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

				<div className='settings-container'>
					<button
						className='btn-settings btn-controls-top'
						onClick={() => setSettingsVisible(!settingsVisible)}
					>
						<MdSettings />
					</button>

					<div className={`settings-options ${settingsVisible && 'is-visible'}`}>
						<button
							className={`btn-controls-top btn-filter-seen ${filterSeen ? 'is-active' : ''}`}
							onClick={handleFilterSeen}
						>
							<MdNewReleases />
							<span className='btn-text'>{filterSeen ? 'Show All Clips' : 'Show Only New Clips'}</span>
						</button>

						{currentSearch.mode === searchType.subreddit && (
							<button
								className={`btn-controls-top btn-nsfw ${nsfw ? '' : 'is-active'}`}
								title='toggle nsfw'
								onClick={handleNsfw}
							>
								<MdBlock />
								<span className='btn-text'>{nsfw ? 'Hide' : 'Show'} NSFW Content</span>
							</button>
						)}

						{currentClip.comments && (
							<button
								className='btn-controls-top btn-comments'
								title='toggle comments'
								onClick={handleComments}
							>
								<MdChatBubble />
								<span className='btn-text'>Toggle Comments</span>
							</button>
						)}

						<button
							className='btn-controls-top btn-inner-fullscreen'
							title='toggle inner fulscreen'
							onClick={handleInnerFullScreen}
						>
							{innerFullScreen ? <MdFullscreenExit /> : <MdFullscreen />}
							<span className='btn-text'>Toggle Inner Full Screen</span>
						</button>
					</div>
				</div>

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
