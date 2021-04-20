import { TwitchClip } from 'src/types/twitch'
import { State, Action } from '../types/state'

export const setClips = (clips: TwitchClip[]): Action => {
	return {
		type: 'SET_CLIPS',
		payload: clips,
	}
}

export const reducer = (state: State, action: Action): State => {
	switch (action.type) {
		case 'SET_CLIPS':
			return {
				...state,
				clips: {
					...action.payload,
				},
			}
		default:
			return state
	}
}
