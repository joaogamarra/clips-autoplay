import { Route, Switch } from 'react-router'
import Search from './components/search/Search'
import Player from './components/videoplayer/Player'

const App: React.FC = () => {
	return (
		<div className='App'>
			<Switch>
				<Route path='/:mode/:id/:timeperiod'>
					<Search />
					<Player />
				</Route>

				<Route path='/'>
					<Search />
				</Route>
			</Switch>
		</div>
	)
}

export default App
