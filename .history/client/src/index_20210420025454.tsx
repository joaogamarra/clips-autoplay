import React from 'react'
import ReactDOM from 'react-dom'

import App from './App'
import { reducer } from './state/reducer'
import { StateProvider } from './state/state'

ReactDOM.render(
	<StateProvider reducer={reducer}>
		<App />
	</StateProvider>,
	document.getElementById('root')
)
