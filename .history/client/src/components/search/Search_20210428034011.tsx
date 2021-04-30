import React, { FC, useCallback, useEffect, useState } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom'
import { getSuggestions } from 'src/common/api'
import { apiTimePeriod, searchClips, searchType } from 'src/types/search'
import { AutocompleteObj } from 'src/types/twitch'

const Search: FC = () => {
	const params = useParams<searchClips>()
	const [localSearch, setLocalSearch] = useState<searchClips>({
		mode: searchType.channel,
		value: '',
		timePeriod: apiTimePeriod.week,
	})

	const [searchSuggestions, setSearchSuggestions] = useState<AutocompleteObj[]>([])
	const history = useHistory()

	const updateSuggestions = useCallback(async () => {
		if (localSearch.value.length === 0) {
			const suggestions: any = await getSuggestions(localSearch.mode)

			setSearchSuggestions(suggestions.data)
		} else {
			const suggestions: any = await getSuggestions(localSearch.mode, localSearch.value)

			setSearchSuggestions(suggestions.data)
		}
	}, [localSearch])

	useEffect(() => {
		updateSuggestions()
	}, [updateSuggestions])

	useEffect(() => {
		if (params.value) {
			setLocalSearch(params)
		}
	}, [params])

	const formSubmit = async (e: React.MouseEvent<HTMLElement>) => {
		e.preventDefault()
		history.push(`/${localSearch.mode}/${localSearch.value}/${localSearch.timePeriod}`)
	}

	const handleSearchTypeChange = (e: React.FormEvent<HTMLSelectElement>) => {
		const val = e.currentTarget.value as searchType

		setLocalSearch({ ...localSearch, mode: val })
	}

	const handleTimePeriodChange = (e: React.FormEvent<HTMLInputElement>) => {
		const val = e.currentTarget.value as apiTimePeriod

		setLocalSearch({ ...localSearch, timePeriod: val })
	}

	const handleSearchChange = async (e: React.FormEvent<HTMLInputElement>) => {
		const val = e.currentTarget.value
		setLocalSearch({ ...localSearch, value: val })
	}

	return (
		<>
			<form>
				<select value={localSearch.mode} name='search-type' onChange={handleSearchTypeChange}>
					<option value={searchType.channel}>Channel</option>
					<option value={searchType.category}>Category/Game</option>
				</select>
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
				<input type='text' placeholder='Search...' value={localSearch.value} onChange={handleSearchChange} />
				<button type='submit' onClick={formSubmit}>
					Submit
				</button>

				{searchSuggestions.length > 0 && (
					<ul>
						{localSearch.mode && (
							<>
								{searchSuggestions.map((suggestion) => (
									<li key={suggestion.id}>
										<Link
											onClick={() => setSearchSuggestions([])}
											to={`/${localSearch.mode}/${suggestion.login}/${localSearch.timePeriod}`}
										>
											{suggestion.login}
										</Link>
									</li>
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
