import React, { createContext, useContext, useReducer } from 'react'
import { apiTimePeriod, searchType } from 'src/types/search'
import { Action, State } from 'src/types/state'

const initialState: State = {
	clips: {
		data: [],
		pagination: {
			cursor: '',
		},
	},
	currentClip: {
		id: '',
		url: '',
		embed_url: '',
		broadcaster_id: '',
		broadcaster_name: '',
		creator_id: '',
		creator_name: '',
		video_id: '',
		game_id: '',
		language: '',
		title: '',
		view_count: 0,
		created_at: '',
		thumbnail_url: '',
		duration: 0,
	},
	clipIndex: -1,
	currentSearch: {
		mode: searchType.channel,
		value: '',
		timePeriod: apiTimePeriod.all,
	},
}

export const StateContext = createContext<[State, React.Dispatch<Action>]>([initialState, () => initialState])

type StateProviderProps = {
	reducer: React.Reducer<State, Action>
	children: React.ReactElement
}

export const StateProvider: React.FC<StateProviderProps> = ({ reducer, children }: StateProviderProps) => {
	const [state, dispatch] = useReducer(reducer, initialState)

	return <StateContext.Provider value={[state, dispatch]}>{children}</StateContext.Provider>
}
export const useStateValue = () => useContext(StateContext)
