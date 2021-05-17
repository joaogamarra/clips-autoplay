import { Route, Switch } from 'react-router'
import Favourites from './components/favourites/Favourites'
import Search from './components/search/Search'
import Player from './components/videoplayer/Player'
import './styles/fonts.scss'
import './styles/reset.scss'
import './styles/App.scss'

const App: React.FC = () => {
	return (
		<>
			<Favourites />
			<main className='main-content'>
				<Switch>
					<Route path='/:mode/:timePeriod/:value?'>
						<Search />
						<Player />
					</Route>

					<Route path='/'>
						<Search />
					</Route>
				</Switch>
			</main>
		</>
	)
}

export default App