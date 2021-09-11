import React, { FC, useCallback, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { getSuggestions } from 'src/common/api'
import { apiTimePeriod, searchClips, searchType, sortType } from 'src/types/search'
import { AutocompleteObj } from 'src/types/twitch'
import RadioCustom from '../common/radioCustom/RadioCustom'
import './search.scss'
import 'src/styles/button-generic.scss'
import Suggestions from './Suggestions'
import SearchSort from './SearchSort'
import SearchFilter from './SearchFilter'

const Search: FC = () => {
	const [localSearch, setLocalSearch] = useState<searchClips>({
		mode: searchType.subreddit,
		value: '',
		timePeriod: apiTimePeriod.day,
		sort: sortType.hot
	})

	const [searchSuggestions, setSearchSuggestions] = useState<AutocompleteObj[]>([])
	const [subredditSuggestions, setSubredditSuggestions] = useState<AutocompleteObj[]>([])
	const [channelSuggestions, setChannelSuggestions] = useState<AutocompleteObj[]>([])
	const [categorySuggestions, setCategorySuggestions] = useState<AutocompleteObj[]>([])
	const history = useHistory()

	const updateSuggestions = useCallback(async () => {
		if (localSearch.value.length > 0 && localSearch.mode !== searchType.livestreamfail) {
			const suggestions: any = await getSuggestions(localSearch.mode, localSearch.value)

			suggestions && setSearchSuggestions(suggestions)
		} else {
			if (localSearch.mode === searchType.subreddit) {
				if (subredditSuggestions.length > 0) {
					setSearchSuggestions(subredditSuggestions)
				} else {
					const suggestions: any = await getSuggestions(localSearch.mode)
					if (suggestions.length > 0) {
						setSearchSuggestions(suggestions)
						setSubredditSuggestions(suggestions)
					}
				}
			}
			if (localSearch.mode === searchType.channel) {
				if (channelSuggestions.length > 0) {
					setSearchSuggestions(channelSuggestions)
				} else {
					const suggestions: any = await getSuggestions(localSearch.mode)
					if (suggestions.length > 0) {
						setSearchSuggestions(suggestions)
						setChannelSuggestions(suggestions)
					}
				}
			}

			if (localSearch.mode === searchType.category) {
				if (categorySuggestions.length > 0) {
					setSearchSuggestions(categorySuggestions)
				} else {
					const suggestions: any = await getSuggestions(localSearch.mode)
					if (suggestions.length > 0) {
						setSearchSuggestions(suggestions)
						setCategorySuggestions(suggestions)
					}
				}
			}
		}
	}, [categorySuggestions, channelSuggestions, localSearch.mode, localSearch.value, subredditSuggestions])

	useEffect(() => {
		updateSuggestions()
	}, [updateSuggestions])

	const formSubmit = async (e: React.MouseEvent<HTMLElement>) => {
		e.preventDefault()
		let value = localSearch.value
		let mode = localSearch.mode
		let period = localSearch.timePeriod

		if (mode === searchType.livestreamfail) {
			mode = searchType.subreddit
			value = 'livestreamfail'
		}

		if (localSearch.sort === sortType.hot) period = apiTimePeriod.day
		if (localSearch.sort && mode === searchType.subreddit) {
			history.push(`/${mode}/${period}/${value}/${localSearch.sort}`)
		} else {
			history.push(`/${mode}/${period}/${value}`)
		}
	}

	const handleSearchTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const val = e.currentTarget.value as searchType
		if (val === searchType.subreddit && localSearch.timePeriod === apiTimePeriod.shuffle) {
			setLocalSearch({ ...localSearch, timePeriod: apiTimePeriod.day, mode: val })
		} else {
			setLocalSearch({ ...localSearch, mode: val })
		}
	}

	const handleTimePeriodChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const val = e.currentTarget.value as apiTimePeriod

		setLocalSearch({ ...localSearch, timePeriod: val })
	}

	const handleSearchChange = async (e: React.FormEvent<HTMLInputElement>) => {
		const val = e.currentTarget.value
		setLocalSearch({ ...localSearch, value: val.replace('/', '') })
	}

	const handleSortChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const val = e.currentTarget.value as sortType

		setLocalSearch({ ...localSearch, sort: val })
	}

	return (
		<div className='search-container'>
			<h2 className='text-intro'>Watch the best Clips from Reddit and Twitch without interruptions</h2>
			<form>
				<div className='inputs-group'>
					<h2 className='title-lg'>Search Clips from</h2>
					<RadioCustom
						id='searchType-reddit'
						name='search-type'
						label='Reddit'
						value={searchType.subreddit}
						onChange={handleSearchTypeChange}
						checked={localSearch.mode === searchType.subreddit}
					/>
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
						value={searchType.livestreamfail}
						onChange={handleSearchTypeChange}
						checked={localSearch.mode === searchType.livestreamfail}
					/>
				</div>
				{(localSearch.mode === searchType.subreddit || localSearch.mode === searchType.livestreamfail) && (
					<SearchSort localSearch={localSearch} handleSortChange={(e) => handleSortChange(e)} />
				)}
				{localSearch.mode === searchType.channel ||
				localSearch.mode === searchType.category ||
				((localSearch.mode === searchType.subreddit || localSearch.mode === searchType.livestreamfail) &&
					localSearch.sort === sortType.top) ? (
					<SearchFilter localSearch={localSearch} handleTimePeriodChange={(e) => handleTimePeriodChange(e)} />
				) : null}

				{localSearch.mode !== searchType.livestreamfail && (
					<input
						className='input-main-search'
						type='text'
						placeholder={
							localSearch.mode === searchType.channel
								? 'Insert the channel name'
								: localSearch.mode === searchType.category
								? 'Insert the category/game name'
								: 'Insert subreddit name'
						}
						value={localSearch.value}
						onChange={handleSearchChange}
					/>
				)}

				<button
					type='submit'
					className='button-generic'
					onClick={formSubmit}
					disabled={localSearch.value === '' && localSearch.mode !== searchType.livestreamfail}
				>
					Search
				</button>

				{localSearch.mode !== searchType.livestreamfail && (
					<Suggestions suggestions={searchSuggestions} localSearch={localSearch} />
				)}
			</form>
		</div>
	)
}

export default Search
