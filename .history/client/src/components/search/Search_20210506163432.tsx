import React, { FC, useCallback, useEffect, useRef, useState } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom'
import { getSuggestions } from 'src/common/api'
import { apiTimePeriod, searchClips, searchType } from 'src/types/search'
import { AutocompleteObj } from 'src/types/twitch'
import ChannelAndAvatar from '../common/channelAndAvatar/ChannelAndAvatar'
import RadioCustom from '../common/radioCustom/RadioCustom'

const Search: FC = () => {
	const params = useParams<searchClips>()
	const [localSearch, setLocalSearch] = useState<searchClips>({
		mode: searchType.channel,
		value: '',
		timePeriod: apiTimePeriod.week,
	})
	let initialLoad = useRef(true)

	const [searchSuggestions, setSearchSuggestions] = useState<AutocompleteObj[]>([])
	const history = useHistory()

	const updateSuggestions = useCallback(async () => {
		if (initialLoad && params.mode) {
			setLocalSearch(params)
			const suggestions: any = await getSuggestions(params.mode, params.value)
			suggestions && setSearchSuggestions(suggestions)

			initialLoad.current = false
		} else {
			if (localSearch.value.length > 0) {
				const suggestions: any = await getSuggestions(localSearch.mode, localSearch.value)

				suggestions && setSearchSuggestions(suggestions)
			} else {
				const suggestions: any = await getSuggestions(localSearch.mode)
				suggestions && setSearchSuggestions(suggestions)
			}
		}
	}, [localSearch, params])

	useEffect(() => {
		updateSuggestions()
	}, [updateSuggestions])

	const formSubmit = async (e: React.MouseEvent<HTMLElement>) => {
		e.preventDefault()
		history.push(`/${localSearch.mode}/${localSearch.timePeriod}/${localSearch.value}`)
	}

	const handleSearchTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const val = e.currentTarget.value as searchType

		setLocalSearch({ ...localSearch, mode: val })
	}

	const handleTimePeriodChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const val = e.currentTarget.value as apiTimePeriod

		setLocalSearch({ ...localSearch, timePeriod: val })
	}

	const handleSearchChange = async (e: React.FormEvent<HTMLInputElement>) => {
		const val = e.currentTarget.value
		setLocalSearch({ ...localSearch, value: val })
	}

	return (
		<div className='search-container'>
			<form>
				<div className='inputs-group'>
					<RadioCustom
						id='searchType-channel'
						name='search-type'
						label='Channel'
						value={searchType.channel}
						onChange={handleSearchTypeChange}
						checked={localSearch.mode === searchType.channel}
					/>
					<RadioCustom
						id='searchType-category'
						name='search-type'
						label='Category/Game'
						value={searchType.category}
						onChange={handleSearchTypeChange}
						checked={localSearch.mode === searchType.category}
					/>
					<RadioCustom
						id='searchType-lsf'
						name='search-type'
						label='LiveStreamFail'
						value={searchType.subreddit}
						onChange={handleSearchTypeChange}
						checked={localSearch.mode === searchType.subreddit}
					/>
				</div>
				<br></br>
				<input
					id='timePeriodDay'
					type='radio'
					name='timePeriod'
					checked={localSearch.timePeriod === apiTimePeriod.day}
					value={apiTimePeriod.day}
					onChange={handleTimePeriodChange}
				/>
				<label htmlFor='timePeriodDay'>Last Day</label>
				<input
					id='timePeriodWeek'
					type='radio'
					name='timePeriod'
					checked={localSearch.timePeriod === apiTimePeriod.week}
					value={apiTimePeriod.week}
					onChange={handleTimePeriodChange}
				/>
				<label htmlFor='timePeriodWeek'>Last Week</label>
				<input
					id='timePeriodMonth'
					type='radio'
					name='timePeriod'
					checked={localSearch.timePeriod === apiTimePeriod.month}
					value={apiTimePeriod.month}
					onChange={handleTimePeriodChange}
				/>
				<label htmlFor='timePeriodMonth'>Last Month</label>
				<input
					id='timePeriodYear'
					type='radio'
					name='timePeriod'
					checked={localSearch.timePeriod === apiTimePeriod.year}
					value={apiTimePeriod.year}
					onChange={handleTimePeriodChange}
				/>

				<label htmlFor='timePeriodYear'>Last Year</label>
				<input
					id='timePeriodAll'
					type='radio'
					name='timePeriod'
					checked={localSearch.timePeriod === apiTimePeriod.all}
					value={apiTimePeriod.all}
					onChange={handleTimePeriodChange}
				/>
				<label htmlFor='timePeriodAll'>All Time</label>
				<br />
				{localSearch.mode !== searchType.subreddit && (
					<input
						type='text'
						placeholder='Search...'
						value={localSearch.value}
						onChange={handleSearchChange}
					/>
				)}
				<button type='submit' onClick={formSubmit} disabled={localSearch.value === ''}>
					Submit
				</button>

				{searchSuggestions.length > 0 && localSearch.mode !== searchType.subreddit && (
					<ul>
						{localSearch.mode && (
							<>
								{searchSuggestions.map((suggestion) => (
									<li key={suggestion.id}>
										<Link to={`/${localSearch.mode}/${localSearch.timePeriod}/${suggestion.name}`}>
											<ChannelAndAvatar src={suggestion.avatar} name={suggestion.name} />
										</Link>
									</li>
								))}
							</>
						)}
					</ul>
				)}
			</form>
		</div>
	)
}

export default Search
