import axios from 'axios'
import React, { useState } from 'react'

const Search: React.FC = () => {
	const [searchValue, setSearchValue] = useState('')
	const apiBaseUrl = 'http://localhost:4000/api/twitch/channel/'

	const getClips = async () => {
		console.log('call')
		try {
			const { data } = await axios.get(`${apiBaseUrl}${searchValue}`)

			console.log(data)
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
