import { FC } from 'react'
import { Link } from 'react-router-dom'
import { searchClips } from 'src/types/search'
import { AutocompleteObj } from 'src/types/twitch'
import { CSSTransitionGroup } from 'react-transition-group'
import ChannelAndAvatar from '../common/channelAndAvatar/ChannelAndAvatar'
import './suggestions.scss'

interface Props {
	suggestions: AutocompleteObj[]
	localSearch: searchClips
}

const Suggestions: FC<Props> = ({ suggestions, localSearch }) => {
	return (
		<section className='suggestions-container'>
			<h2 className='title-lg'>Suggestions</h2>
			<ul className='suggestions-list'>
				{localSearch.mode && (
					<>
						{suggestions.map((suggestion) => (
							<CSSTransitionGroup
								transitionName='example'
								transitionEnterTimeout={500}
								transitionLeaveTimeout={300}
							>
								<li className='suggestions-item' key={suggestion.id}>
									<Link to={`/${localSearch.mode}/${localSearch.timePeriod}/${suggestion.name}`}>
										<ChannelAndAvatar src={suggestion.avatar} name={suggestion.name} />
									</Link>
								</li>
							</CSSTransitionGroup>
						))}
					</>
				)}
			</ul>
		</section>
	)
}

export default Suggestions