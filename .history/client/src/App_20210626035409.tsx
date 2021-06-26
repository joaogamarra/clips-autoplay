import { Route, Switch } from 'react-router'
import Favourites from './components/favourites/Favourites'
import Search from './components/search/Search'
import Player from './components/videoplayer/Player'
import './styles/App.scss'
import LogoMain from './components/logoMain/LogoMain'
import ReactGA from 'react-ga'
import { createBrowserHistory } from 'history'
import { useEffect } from 'react'

ReactGA.initialize('UA-200630534-1', {
	debug: true,
})
const browserHistory = createBrowserHistory()

browserHistory.listen((location, action) => {
	ReactGA.pageview(location.pathname + location.search)
})

const App: React.FC = () => {
	useEffect(() => {
		ReactGA.pageview(window.location.pathname + window.location.search)
	}, [])
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
