import { Route, Switch } from 'react-router'
import Search from './components/search/Search'
import Player from './components/videoplayer/Player'

const App: React.FC = () => {
	return (
		<div className='App'>
			<Search />
			<Switch>
				<Route path='/watch'>
					<Player />
				</Route>
			</Switch>
		</div>
	)
}

export default App
