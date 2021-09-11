import { Route, Switch } from 'react-router'
import Sidebar from './components/sidebar/Sidebar'
import Search from './components/search/Search'
import Player from './components/videoplayer/Player'
import './styles/App.scss'
import { ImTwitter } from 'react-icons/im'
import LogoMain from './components/logoMain/LogoMain'
import ReactGA from 'react-ga'
import { createBrowserHistory } from 'history'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Privacy from './components/privacy/Privacy'

ReactGA.initialize('UA-200630534-1')
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
			<Sidebar />
			<main className='main-content'>
				<LogoMain />
				<Switch>
					<Route path='/:mode/:timePeriod/:value/:sort?'>
						<Player />
					</Route>

					<Route path='/privacy'>
						<Privacy />
					</Route>

					<Route path='/'>
						<Search />
						<div className='bottom-links'>
							<a
								className='link-twitter'
								target='_blank'
								rel='noreferrer'
								href='https://twitter.com/clipsautoplay'
							>
								<ImTwitter /> Follow on Twitter for Feedback/Updates <ImTwitter />
							</a>
							<Link className='link-privacy' to='/privacy'>
								Privacy Policy
							</Link>
						</div>
					</Route>
				</Switch>
			</main>
		</>
	)
}

export default App
