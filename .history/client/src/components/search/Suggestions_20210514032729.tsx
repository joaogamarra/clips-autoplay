import { FC } from 'react'
import { Link } from 'react-router-dom'
import { searchClips } from 'src/types/search'
import { AutocompleteObj } from 'src/types/twitch'
import ChannelAndAvatar from '../common/channelAndAvatar/ChannelAndAvatar'
import './suggestions.scss'

interface Props {
	suggestions: AutocompleteObj[]
	localSearch: searchClips
}

const Suggestions: FC<Props> = ({ suggestions, localSearch }) => {
	const defaultAvatar =
		'https://static-cdn.jtvnw.net/user-default-pictures-uv/cdd517fe-def4-11e9-948e-784f43822e80-profile_image-70x70.png'
	return (
		<section className='suggestions-container'>
			<h2 className='title-lg'>Suggestions</h2>
			{suggestions.length > 0 ? (
				<ul className='suggestions-list'>
					{localSearch.mode && (
						<>
							{suggestions.map((suggestion, index) => (
								<li className='suggestions-item' key={suggestion.id}>
									<Link to={`/${localSearch.mode}/${localSearch.timePeriod}/${suggestion.name}`}>
										<ChannelAndAvatar
											src={suggestion.avatar !== undefined ? suggestion.avatar : defaultAvatar}
											name={suggestion.name}
										/>
									</Link>
								</li>
							))}
						</>
					)}
				</ul>
			) : (
				<p className='no-suggestions'>
					No suggestions found but you can still search using the button since not every user is in our
					database.
				</p>
			)}
		</section>
	)
}

export default Suggestions
