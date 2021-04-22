import axios from 'axios'
import React, { useState } from 'react'
import { setClipIndex, setClips, setCurrentClip } from 'src/state/reducer'
import { useStateValue } from 'src/state/state'
import { TwitchClipsResponse } from 'src/types/twitch'

const getClips = async (queryId: string) => {
	const apiBaseUrl = 'http://localhost:4000/api/twitch/channel/'

	const { data }: { data: TwitchClipsResponse } = await axios.get(`${apiBaseUrl}${queryId}`)

	return data
}

const Search: React.FC = () => {
	const [searchValue, setSearchValue] = useState('')
	const [, dispatch] = useStateValue()

	const formSubmit = async (e: React.MouseEvent<HTMLElement>) => {
		e.preventDefault()

		try {
			const data = await getClips(searchValue)

			dispatch(setClips(data))
			dispatch(setCurrentClip(data.data[0]))
			dispatch(setClipIndex(0))
		} catch (e) {
			console.error(e)
		}
	}

	return (
		<>
			<form>
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
