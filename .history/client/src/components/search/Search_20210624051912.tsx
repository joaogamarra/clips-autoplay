import React, { FC, useCallback, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { getSuggestions } from 'src/common/api'
import { apiTimePeriod, searchClips, searchType, sortType } from 'src/types/search'
import { AutocompleteObj } from 'src/types/twitch'
import RadioCustom from '../common/radioCustom/RadioCustom'
import './search.scss'
import 'src/styles/button-generic.scss'
import Suggestions from './Suggestions'

const Search: FC = () => {
	const [localSearch, setLocalSearch] = useState<searchClips>({
		mode: searchType.channel,
		value: '',
		timePeriod: apiTimePeriod.day,
		sort: sortType.hot,
	})

	const [searchSuggestions, setSearchSuggestions] = useState<AutocompleteObj[]>([])
	const [channelSuggestions, setChannelSuggestions] = useState<AutocompleteObj[]>([])
	const [categorySuggestions, setCategorySuggestions] = useState<AutocompleteObj[]>([])
	const history = useHistory()

	const updateSuggestions = useCallback(async () => {
		if (localSearch.value.length > 0 && localSearch.mode !== searchType.subreddit) {
			const suggestions: any = await getSuggestions(localSearch.mode, localSearch.value)

			suggestions && setSearchSuggestions(suggestions)
		} else {
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
	}, [categorySuggestions, channelSuggestions, localSearch.mode, localSearch.value])

	useEffect(() => {
		updateSuggestions()
	}, [updateSuggestions])

	const formSubmit = async (e: React.MouseEvent<HTMLElement>) => {
		e.preventDefault()
		let value = localSearch.value

		if (localSearch.mode === searchType.subreddit) value = localSearch.sort

		history.push(`/${localSearch.mode}/${localSearch.timePeriod}/${value}`)
	}

	const handleSearchTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const val = e.currentTarget.value as searchType

		setLocalSearch({ ...localSearch, mode: val })
	}

	const handleTimePeriodChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const val = e.currentTarget.value as apiTimePeriod

		setLocalSearch({ ...localSearch, timePeriod: val })
	}

	const handleSearchChange = async (e: React.FormEvent<HTMLInputElement>) => {
		const val = e.currentTarget.value
		setLocalSearch({ ...localSearch, value: val })
	}

	const handleSortChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const val = e.currentTarget.value as sortType

		setLocalSearch({ ...localSearch, sort: val })
	}

	return (
		<div className='search-container'>
			<form>
				<div className='inputs-group'>
					<h2 className='title-lg'>Search Clips by</h2>
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
						value={searchType.subreddit}
						onChange={handleSearchTypeChange}
						checked={localSearch.mode === searchType.subreddit}
					/>
				</div>
				<div className='inputs-group'>
					<h2 className='title-lg'>Filter by Time</h2>
					<RadioCustom
						id='timePeriod-day'
						name='timePeriod'
						label='Day'
						value={apiTimePeriod.day}
						onChange={handleTimePeriodChange}
						checked={localSearch.timePeriod === apiTimePeriod.day}
					/>
					<RadioCustom
						id='timePeriod-week'
						name='timePeriod'
						label='Week'
						value={apiTimePeriod.week}
						onChange={handleTimePeriodChange}
						checked={localSearch.timePeriod === apiTimePeriod.week}
					/>
					<RadioCustom
						id='timePeriod-month'
						name='timePeriod'
						label='Month'
						value={apiTimePeriod.month}
						onChange={handleTimePeriodChange}
						checked={localSearch.timePeriod === apiTimePeriod.month}
					/>
					<RadioCustom
						id='timePeriod-year'
						name='timePeriod'
						label='Year'
						value={apiTimePeriod.year}
						onChange={handleTimePeriodChange}
						checked={localSearch.timePeriod === apiTimePeriod.year}
					/>
					<RadioCustom
						id='timePeriod-all'
						name='timePeriod'
						label='All'
						value={apiTimePeriod.all}
						onChange={handleTimePeriodChange}
						checked={localSearch.timePeriod === apiTimePeriod.all}
					/>
				</div>
				{localSearch.mode === searchType.subreddit && (
					<div className='inputs-group'>
						<h2 className='title-lg'>Sort by</h2>
						<RadioCustom
							id='sort-popular'
							name='sort'
							label='Popular Now'
							value={sortType.hot}
							onChange={handleSortChange}
							checked={localSearch.sort === sortType.hot}
						/>
						<RadioCustom
							id='sort-top'
							name='sort'
							label='Most Votes'
							value={sortType.top}
							onChange={handleSortChange}
							checked={localSearch.sort === sortType.top}
						/>
						<RadioCustom
							id='sort-new'
							name='sort'
							label='Most Recent'
							value={sortType.new}
							onChange={handleSortChange}
							checked={localSearch.sort === sortType.new}
						/>
					</div>
				)}
				{localSearch.mode !== searchType.subreddit && (
					<input
						className='input-main-search'
						type='text'
						placeholder={
							localSearch.mode === searchType.channel
								? 'Insert the channel name'
								: 'Insert the category/game name'
						}
						value={localSearch.value}
						onChange={handleSearchChange}
					/>
				)}
				<button
					type='submit'
					className='button-generic'
					onClick={formSubmit}
					disabled={localSearch.value === '' && localSearch.mode !== searchType.subreddit}
				>
					Search
				</button>

				{localSearch.mode !== searchType.subreddit && (
					<Suggestions suggestions={searchSuggestions} localSearch={localSearch} />
				)}
			</form>
		</div>
	)
}

export default Search
