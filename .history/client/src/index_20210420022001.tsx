import React from 'react'
import ReactDOM from 'react-dom'

import App from './App'
import { reducer } from './state/reducer'
import { stateProvider } from './state/state'

ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById('root')
)
