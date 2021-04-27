import { Route, Switch } from 'react-router'
import Favourites from './components/favourites/Favourites.tsx'
import Search from './components/search/Search'
import Player from './components/videoplayer/Player'

const App: React.FC = () => {
	return (
		<div className='App'>
			<Switch>
				<Route path='/:searchMode/:searchValue/:searchTimePeriod'>
					<Search />
					<Player />
				</Route>

				<Route path='/'>
					<Search />

					<Favourites></Favourites>
				</Route>
			</Switch>
		</div>
	)
}

export default App
