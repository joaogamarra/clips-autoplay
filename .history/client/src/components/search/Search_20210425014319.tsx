import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { getAutocomplete } from 'src/common/api'
import { apiTimePeriod, currentSearch, searchType } from 'src/types/search'
import { AutocompleteObj } from 'src/types/twitch'

const Search: React.FC = () => {
	const params = useParams<currentSearch>()
	const [searchValue, setSearchValue] = useState(params.searchValue)
	const [timePeriod, setTimePeriod] = useState<apiTimePeriod>(params.searchTimePeriod)
	const [localSearchMode, setLocalSearchMode] = useState<searchType>(params.searchMode)
	const [searchSuggestions, setSearchSuggestions] = useState<AutocompleteObj[]>([])
	const history = useHistory()

	if (params.searchValue) {
		console.log('yyeea')
	}

	const formSubmit = async (e: React.MouseEvent<HTMLElement>) => {
		e.preventDefault()
		history.push(`/${localSearchMode}/${searchValue}/${timePeriod}`)
	}

	const handleSearchTypeChange = (e: React.FormEvent<HTMLSelectElement>) => {
		const val = e.currentTarget.value as searchType

		setLocalSearchMode(val)
	}

	const handleTimePeriodChange = (e: React.FormEvent<HTMLInputElement>) => {
		const val = e.currentTarget.value as apiTimePeriod

		setTimePeriod(val)
	}

	const handleSearchChange = async (e: React.FormEvent<HTMLInputElement>) => {
		const val = e.currentTarget.value
		setSearchValue(val)

		if (val.length > 1) {
			const autoRes: any = await getAutocomplete(val, localSearchMode)

			setSearchSuggestions(autoRes.data)
		} else {
			setSearchSuggestions([])
		}
	}

	return (
		<>
			<form>
				<select value={localSearchMode} name='search-type' onChange={handleSearchTypeChange}>
					<option value={searchType.channel}>Channel</option>
					<option value={searchType.category}>Category/Game</option>
				</select>
				<input
					id='timePeriodDay'
					type='radio'
					name='timePeriod'
					checked={timePeriod === apiTimePeriod.day}
					value={apiTimePeriod.day}
					onChange={handleTimePeriodChange}
				/>
				<label htmlFor='timePeriodDay'>Last Day</label>
				<input
					id='timePeriodWeek'
					type='radio'
					name='timePeriod'
					checked={timePeriod === apiTimePeriod.week}
					value={apiTimePeriod.week}
					onChange={handleTimePeriodChange}
				/>
				<label htmlFor='timePeriodWeek'>Last Week</label>
				<input
					id='timePeriodMonth'
					type='radio'
					name='timePeriod'
					checked={timePeriod === apiTimePeriod.month}
					value={apiTimePeriod.month}
					onChange={handleTimePeriodChange}
				/>
				<label htmlFor='timePeriodMonth'>Last Month</label>
				<input
					id='timePeriodYear'
					type='radio'
					name='timePeriod'
					checked={timePeriod === apiTimePeriod.year}
					value={apiTimePeriod.year}
					onChange={handleTimePeriodChange}
				/>

				<label htmlFor='timePeriodYear'>Last Year</label>
				<input
					id='timePeriodAll'
					type='radio'
					name='timePeriod'
					checked={timePeriod === apiTimePeriod.all}
					value={apiTimePeriod.all}
					onChange={handleTimePeriodChange}
				/>
				<label htmlFor='timePeriodAll'>All Time</label>
				<br />
				<input type='text' placeholder='Search...' value={searchValue} onChange={handleSearchChange} />
				<button type='submit' onClick={formSubmit}>
					Submit
				</button>

				{searchSuggestions.length > 0 && (
					<ul>
						{localSearchMode === searchType.channel && (
							<>
								{searchSuggestions.map((suggestion) => (
									<li key={suggestion.login}>{suggestion.login}</li>
								))}
							</>
						)}

						{localSearchMode === searchType.category && (
							<>
								{searchSuggestions.map((suggestion) => (
									<li key={suggestion.name}>{suggestion.name}</li>
								))}
							</>
						)}
					</ul>
				)}
			</form>
		</>
	)
}

export default Search
