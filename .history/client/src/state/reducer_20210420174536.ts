import { TwitchClipsResponse } from 'src/types/twitch'
import { State, Action } from 'src/types/state'

export const setClips = (clips: TwitchClipsResponse): Action => {
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
