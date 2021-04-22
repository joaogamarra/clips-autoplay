import React, { useState } from 'react'
import { getClips } from 'src/common/api'
import { setClipIndex, setClips, setCurrentClip } from 'src/state/reducer'
import { useStateValue } from 'src/state/state'
import { searchType } from 'src/types/search'

const Search: React.FC = () => {
	const [searchValue, setSearchValue] = useState('')
	const [searchMode, setSearchMode] = useState<searchType>(searchType.channel)
	const [, dispatch] = useStateValue()

	const formSubmit = async (e: React.MouseEvent<HTMLElement>) => {
		e.preventDefault()

		console.log(searchType)
		try {
			const data = await getClips(searchValue)

			dispatch(setClips(data))
			dispatch(setCurrentClip(data.data[0]))
			dispatch(setClipIndex(0))
		} catch (e) {
			console.error(e)
		}
	}

	const handleSearchTypeChange = (e: React.FormEvent<HTMLSelectElement>) => {
		const val = e.currentTarget.value
		if (val === searchType.category) {
			console.log('success')
			setSearchMode(searchType.category)
		}
	}

	return (
		<>
			<form>
				<select value={searchMode} name='search-type' onChange={handleSearchTypeChange}>
					<option value={searchType.channel}>Channel</option>
					<option value={searchType.category}>Category/Game</option>
				</select>
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
