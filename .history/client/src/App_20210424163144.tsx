import { Route } from 'react-router'
import Search from './components/search/Search'
import Player from './components/videoplayer/Player'

const App: React.FC = () => {
	return (
		<div className='App'>
			<Search />
			<Route path='/watch'>
				<Player />
			</Route>
		</div>
	)
}

export default App
