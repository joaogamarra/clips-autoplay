import { Route, Switch } from 'react-router'
import Favourites from './components/favourites/Favourites'
import Search from './components/search/Search'
import Player from './components/videoplayer/Player'

const App: React.FC = () => {
	return (
		<div className='App'>
			<Favourites />
			<Search />
			<Switch>
				<Route path='/:mode/:value/:timePeriod'>
					<Player />
				</Route>
			</Switch>
		</div>
	)
}

export default App
