import { Route, Switch } from 'react-router'
import Favourites from './components/favourites/Favourites'
import Search from './components/search/Search'
import Player from './components/videoplayer/Player'

const App: React.FC = () => {
	return (
		<div className='App'>
			<Switch>
				<Route path='/:mode/:value/:timePeriod'>
					<Search />
					<Player />
				</Route>

				<Route path='/'>
					<Favourites />
					<Search />
				</Route>
			</Switch>
		</div>
	)
}

export default App
