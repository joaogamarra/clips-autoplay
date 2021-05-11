import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

import App from './App'
import { reducer } from './state/reducer'
import { StateProvider } from './state/state'

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
