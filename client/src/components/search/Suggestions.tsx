import { FC } from 'react'
import { Link } from 'react-router-dom'
import { searchClips, searchType } from 'src/types/search'
import { AutocompleteObj } from 'src/types/twitch'
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
			{suggestions.length > 0 ? (
				<ul className='suggestions-list'>
					{localSearch.mode && (
						<>
							{suggestions?.map(({ avatar, name }) => (
								<li className='suggestions-item' key={name}>
									{localSearch.mode === searchType.subreddit ? (
										<Link to={`/${localSearch.mode}/${localSearch.timePeriod}/${name}/${localSearch.sort}`}>
											<ChannelAndAvatar src={avatar} name={name} type={localSearch.mode} />
										</Link>
									) : (
										<Link to={`/${localSearch.mode}/${localSearch.timePeriod}/${name}`}>
											<ChannelAndAvatar src={avatar} name={name} type={localSearch.mode} />
										</Link>
									)}
								</li>
							))}
						</>
					)}
				</ul>
			) : (
				<p className='no-suggestions'>
					No suggestions found but you can still search using the "Search" button since not every result is in
					our database.
				</p>
			)}
		</section>
	)
}

export default Suggestions
