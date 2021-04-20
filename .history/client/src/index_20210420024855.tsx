import React from 'react'
import ReactDOM from 'react-dom'

import App from './App'
import { reducer } from './state/reducer'
import { StateProvider } from './state/state'

ReactDOM.render(
	<React.StrictMode>
		<StateProvider reducer={reducer}>
			<App />
		</StateProvider>
	</React.StrictMode>,
	document.getElementById('root')
)
