import { FC } from 'react'
import { searchClips, sortType } from 'src/types/search'
import RadioCustom from '../common/radioCustom/RadioCustom'

interface Props {
	localSearch: searchClips
	handleSortChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const SearchSort: FC<Props> = ({ localSearch, handleSortChange }) => {
	return (
		<>
			<h2 className='title-lg'>Sort by</h2>
			<div className='inputs-group'>
				<RadioCustom
					id='sort-popular'
					name='sort'
					label='Popular Now'
					value={sortType.hot}
					onChange={(e) => handleSortChange(e)}
					checked={localSearch.sort === sortType.hot}
				/>
				<RadioCustom
					id='sort-top'
					name='sort'
					label='Most Votes'
					value={sortType.top}
					onChange={(e) => handleSortChange(e)}
					checked={localSearch.sort === sortType.top}
				/>
				<RadioCustom
					id='sort-new'
					name='sort'
					label='Most Recent'
					value={sortType.new}
					onChange={(e) => handleSortChange(e)}
					checked={localSearch.sort === sortType.new}
				/>
			</div>
		</>
	)
}

export default SearchSort
