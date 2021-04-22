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
		const val = e.currentTarget.value
		if (val === searchType.category) {
			setLocalSearchMode(searchType.category)
		}

		if (val === searchType.channel) {
			setLocalSearchMode(searchType.channel)
		}
	}

	return (
		<>
			<form>
				<select value={localSearchMode} name='search-type' onChange={handleSearchTypeChange}>
					<option value={searchType.channel}>Channel</option>
					<option value={searchType.category}>Category/Game</option>
				</select>
				<input id='timePeriodDay' type='radio' name='timePeriod' value={apiTimePeriod.day} />
				<label htmlFor='timePeriodDay'>Last Day</label>
				<input id='timePeriodWeek' type='radio' name='timePeriod' value={apiTimePeriod.week} />
				<label htmlFor='timePeriodWeek'>Last Week</label>
				<input id='timePeriodYear' type='radio' name='timePeriod' value={apiTimePeriod.month} />
				<label htmlFor='timePeriodYear'>Last Year</label>
				<input id='timePeriodAll' type='radio' name='timePeriod' value={apiTimePeriod.all} />
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
