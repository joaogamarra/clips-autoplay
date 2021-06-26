import { Route, Switch } from 'react-router'
import Favourites from './components/favourites/Favourites'
import Search from './components/search/Search'
import Player from './components/videoplayer/Player'
import './styles/App.scss'
import LogoMain from './components/logoMain/LogoMain'
import ReactGA from 'react-ga'

const App: React.FC = () => {
	ReactGA.initialize('UA-200630534-1', {
		debug: true,
	})
	ReactGA.pageview(window.location.pathname + window.location.search)
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
