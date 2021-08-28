import { FC, useState } from 'react'
import {
	MdChevronRight,
	MdChatBubble,
	MdFullscreenExit,
	MdFullscreen,
	MdBlock,
	MdNewReleases,
	MdSettings,
	MdSearch
} from 'react-icons/md'
import twitchLogo from '../../assets/logo-twitch.svg'
import { useStateValue } from 'src/state/state'
import { apiTimePeriod, searchClips, searchType, sortType } from 'src/types/search'
import SearchFilter from '../search/SearchFilter'
import { useHistory, useParams } from 'react-router-dom'
import SearchSort from '../search/SearchSort'

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
	const params = useParams<searchClips>()
	const [settingsVisible, setSettingsVisible] = useState(false)
	const [searchVisible, setSearchVisible] = useState(false)
	const [localSearch, setLocalSearch] = useState<searchClips>({
		mode: params.mode,
		value: params.value,
		timePeriod: params.timePeriod,
		sort: params.sort
	})
	const history = useHistory()

	const handleTimePeriodChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const val = e.currentTarget.value as apiTimePeriod

		setLocalSearch({ ...localSearch, timePeriod: val })
	}

	const handleSortChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const val = e.currentTarget.value as sortType

		setLocalSearch({ ...localSearch, sort: val })
	}

	const searchSubmit = async (e: React.MouseEvent<HTMLElement>) => {
		e.preventDefault()
		let value = localSearch.value
		let mode = localSearch.mode
		let period = localSearch.timePeriod

		if (localSearch.sort === sortType.hot) period = apiTimePeriod.day
		if (localSearch.sort && mode === searchType.subreddit) {
			history.push(`/${mode}/${period}/${value}/${localSearch.sort}`)
		} else {
			history.push(`/${mode}/${period}/${value}`)
		}
	}

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

				<div className='buttons-container'>
					<button
						title='Change Search'
						className='btn-new-search btn-controls-top'
						onClick={() => setSearchVisible(!searchVisible)}
					>
						<MdSearch />
					</button>

					<div className={`hidden-options new-search ${searchVisible ? 'is-visible' : ''}`}>
						{(localSearch.mode === searchType.subreddit ||
							localSearch.mode === searchType.livestreamfail) && (
							<SearchSort localSearch={localSearch} handleSortChange={(e) => handleSortChange(e)} />
						)}
						{localSearch.mode === searchType.channel ||
						localSearch.mode === searchType.category ||
						((localSearch.mode === searchType.subreddit || localSearch.mode === searchType.livestreamfail) &&
							localSearch.sort === sortType.top) ? (
							<SearchFilter
								localSearch={localSearch}
								handleTimePeriodChange={(e) => handleTimePeriodChange(e)}
							/>
						) : null}

						<button type='submit' className='button-generic' onClick={searchSubmit}>
							Search
						</button>
					</div>
				</div>

				<div className='buttons-container'>
					<button
						title='Settings'
						className='btn-settings btn-controls-top'
						onClick={() => setSettingsVisible(!settingsVisible)}
					>
						<MdSettings />
					</button>

					<div className={`hidden-options ${settingsVisible ? 'is-visible' : ''}`}>
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
