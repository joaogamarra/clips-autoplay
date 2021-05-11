import { FC } from 'react'
import { Link } from 'react-router-dom'
import { searchClips } from 'src/types/search'
import { AutocompleteObj } from 'src/types/twitch'
import { CSSTransition } from 'react-transition-group'
import ChannelAndAvatar from '../common/channelAndAvatar/ChannelAndAvatar'
import './suggestions.scss'

interface Props {
	suggestions: AutocompleteObj[]
	localSearch: searchClips
	suggestionsAnim: boolean
}

const Suggestions: FC<Props> = ({ suggestions, localSearch, suggestionsAnim }) => {
	return (
		<section className='suggestions-container'>
			<h2 className='title-lg'>Suggestions</h2>
			<ul className='suggestions-list'>
				{localSearch.mode && (
					<>
						{suggestions.map((suggestion) => (
							<CSSTransition
								in={suggestionsAnim}
								timeout={200}
								classNames='animation'
								key='suggestion-animation'
							>
								<li className='suggestions-item' key={suggestion.id}>
									<Link to={`/${localSearch.mode}/${localSearch.timePeriod}/${suggestion.name}`}>
										<ChannelAndAvatar src={suggestion.avatar} name={suggestion.name} />
									</Link>
								</li>
							</CSSTransition>
						))}
					</>
				)}
			</ul>
		</section>
	)
}

export default Suggestions
