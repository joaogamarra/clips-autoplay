import axios from 'axios'
import React, { useState } from 'react'
import { setClips } from 'src/state/reducer'
import { useStateValue } from 'src/state/state'

const Search: React.FC = () => {
	const [searchValue, setSearchValue] = useState('')
	const [{ clips }, dispatch] = useStateValue()
	const apiBaseUrl = 'http://localhost:4000/api/twitch/channel/'

	const getClips = async () => {
		try {
			const { data } = await axios.get(`${apiBaseUrl}${searchValue}`)

			dispatch(setClips(data))
		} catch (e) {
			console.error(e)
		}
	}

	const formSubmit = (e: React.MouseEvent<HTMLElement>) => {
		e.preventDefault()
		getClips()
	}

	return (
		<>
			<form>
				<input
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
