import { useState } from 'react'

const Search: React.FC = () => {
	const [input, setInputl] = useState('')

	const formSubmit = () => {
		console.log(input)
	}

	return (
		<>
			<form>
				<input
					type='text'
					placeholder='Search...'
					value={input}
					onChange={(e) => setInputl(e.target.value)}
				/>
				<button type='submit' onClick={formSubmit}>
					Submit
				</button>
			</form>
		</>
	)
}

export default Search
