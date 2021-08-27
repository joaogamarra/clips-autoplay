import { FC } from 'react'
import { apiTimePeriod, searchClips, searchType, sortType } from 'src/types/search'
import RadioCustom from '../common/radioCustom/RadioCustom'

interface Props {
	localSearch: searchClips
	handleTimePeriodChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const SearchFilter: FC<Props> = ({ localSearch, handleTimePeriodChange }) => {
	return (
		<>
			<h2 className='title-lg'>Filter by</h2>
			<div className='inputs-group'>
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
				{(localSearch.mode === searchType.channel || localSearch.mode === searchType.category) && (
					<RadioCustom
						id='timePeriod-shuffle'
						name='timePeriod'
						label='Shuffle'
						value={apiTimePeriod.shuffle}
						onChange={handleTimePeriodChange}
						checked={localSearch.timePeriod === apiTimePeriod.shuffle}
					/>
				)}
			</div>
		</>
	)
}

export default SearchFilter
