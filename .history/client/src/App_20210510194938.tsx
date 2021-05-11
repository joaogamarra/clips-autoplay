import { Route, Switch } from 'react-router'
import Favourites from './components/favourites/Favourites'
import Search from './components/search/Search'
import Player from './components/videoplayer/Player'
import './styles/fonts.scss'
import './styles/reset.scss'
import './styles/App.scss'
import LogoMain from './components/logoMain/LogoMain'

const App: React.FC = () => {
	return (
		<>
			<Favourites />
			<main className='main-content'>
				<LogoMain />
				<Switch>
					<Route path='/:mode/:timePeriod/:value?'>
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
