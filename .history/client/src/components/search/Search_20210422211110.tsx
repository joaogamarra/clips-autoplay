import React, { useState } from 'react'
import { getClips } from 'src/common/api'
import { setClipIndex, setClips, setCurrentClip, setSearchMode } from 'src/state/reducer'
import { useStateValue } from 'src/state/state'
import { apiTimePeriod, searchType } from 'src/types/search'

const Search: React.FC = () => {
	const [searchValue, setSearchValue] = useState('')
	const [timePeriod, setTimePeriod] = useState<apiTimePeriod>(apiTimePeriod.all)
	const [localSearchMode, setLocalSearchMode] = useState<searchType>(searchType.channel)
	const [, dispatch] = useStateValue()

	const formSubmit = async (e: React.MouseEvent<HTMLElement>) => {
		e.preventDefault()

		try {
			const data = await getClips(searchValue, localSearchMode)

			dispatch(setClips(data))
			dispatch(setCurrentClip(data.data[0]))
			dispatch(setClipIndex(0))
			dispatch(
				setSearchMode({
					mode: localSearchMode,
					value: searchValue,
				})
			)
		} catch (e) {
			console.error(e)
		}
	}

	const handleSearchTypeChange = (e: React.FormEvent<HTMLSelectElement>) => {
		const val = e.currentTarget.value as searchType

		setLocalSearchMode(val)
	}

	const handleTimePeriodChange = (e: React.FormEvent<HTMLInputElement>) => {
		const val = e.currentTarget.value as apiTimePeriod

		setTimePeriod(val)
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
					value={apiTimePeriod.day}
					onChange={handleTimePeriodChange}
				/>
				<label htmlFor='timePeriodDay'>Last Day</label>
				<input
					id='timePeriodWeek'
					type='radio'
					name='timePeriod'
					value={apiTimePeriod.week}
					onChange={handleTimePeriodChange}
				/>
				<label htmlFor='timePeriodWeek'>Last Week</label>
				<input
					id='timePeriodYear'
					type='radio'
					name='timePeriod'
					value={apiTimePeriod.month}
					onChange={handleTimePeriodChange}
				/>
				<label htmlFor='timePeriodYear'>Last Year</label>
				<input
					id='timePeriodAll'
					type='radio'
					name='timePeriod'
					value={apiTimePeriod.all}
					onChange={handleTimePeriodChange}
				/>
				<label htmlFor='timePeriodAll'>All Time</label>
				<br />
				<input
					name='search'
					type='text'
					placeholder='Search...'
					value={searchValue}
					onChange={(e) => setSearchValue(e.target.value)}
				/>
				<button type='submit' onClick={formSubmit}>
					Submit
				</button>
			</form>
		</>
	)
}

export default Search
