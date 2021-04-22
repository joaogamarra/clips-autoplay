import axios from 'axios'
import React, { useState } from 'react'
import { setClipIndex, setClips, setCurrentClip } from 'src/state/reducer'
import { useStateValue } from 'src/state/state'
import { TwitchClipsResponse } from 'src/types/twitch'

const Search: React.FC = () => {
	const [searchValue, setSearchValue] = useState('')
	const [{ clips, currentClip, clipIndex }, dispatch] = useStateValue()
	const apiBaseUrl = 'http://localhost:4000/api/twitch/channel/'

	const getClips = async () => {
		try {
			const { data }: { data: TwitchClipsResponse } = await axios.get(`${apiBaseUrl}${searchValue}`)

			dispatch(setClips(data))
			dispatch(setCurrentClip(data.data[0]))
			dispatch(setClipIndex(0))
			console.log(currentClip.duration)
			const iframeLoad = 2000
			const duration = clips.data[clipIndex].duration * 1000 + iframeLoad
			console.log(duration)
			setTimeout(() => {
				console.log('timeout called' + duration)
				const newClipIndex = clipIndex + 1
				dispatch(setCurrentClip(clips.data[newClipIndex]))
				dispatch(setClipIndex(newClipIndex))
			}, duration)
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
