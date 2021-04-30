import { Route, Switch } from 'react-router'
import Favourites from './components/favourites/Favourites'
import Search from './components/search/Search'
import Player from './components/videoplayer/Player'

const App: React.FC = () => {
	return (
		<div className='App'>
			<Switch>
				<Route path='/:mode/:value/:timePeriod'>
					<Player />
				</Route>

				<Favourites />
				<Search />
			</Switch>
		</div>
	)
}

export default App
