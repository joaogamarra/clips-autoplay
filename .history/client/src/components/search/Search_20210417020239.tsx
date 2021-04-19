import { useState } from 'react'

const Search: React.FC = () => {
	const [searchValue, setSearchValue] = useState('')

	const formSubmit = () => {
		console.log(input)
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
