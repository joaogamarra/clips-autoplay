import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import ReactGA from 'react-ga'

import App from './App'
import { reducer } from './state/reducer'
import { StateProvider } from './state/state'

ReactGA.initialize('UA-200630534-1')
ReactGA.pageview(window.location.pathname + window.location.search)

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
