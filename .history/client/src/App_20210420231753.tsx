import { useEffect } from 'react'
import Search from './components/search/Search'
import Player from './components/videoplayer/Player'

const App: React.FC = () => {
	useEffect(() => {
		const script = document.createElement('script')

		script.src = 'https://player.twitch.tv/js/embed/v1.js'
		script.async = true

		document.body.appendChild(script)

		return () => {
			document.body.removeChild(script)
		}
	}, [])

	return (
		<div className='App'>
			<Search />
			<Player />
		</div>
	)
}

export default App
