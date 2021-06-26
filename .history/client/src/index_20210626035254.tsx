import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

import App from './App'
import { reducer } from './state/reducer'
import { StateProvider } from './state/state'
import { createBrowserHistory } from 'history'
import ReactGA from 'react-ga'

ReactGA.initialize('UA-200630534-1')
const browserHistory = createBrowserHistory()

browserHistory.listen((location, action) => {
	ReactGA.pageview(location.pathname + location.search)

	console.log('hey')
})

ReactDOM.render(
	<React.StrictMode>
		<StateProvider reducer={reducer}>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</StateProvider>
	</React.StrictMode>,
	document.getElementById('root')
)
