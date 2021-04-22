import { TwitchClip, TwitchClipsResponse } from 'src/types/twitch'
import { State, Action } from 'src/types/state'

export const setClips = (clips: TwitchClipsResponse): Action => {
	return {
		type: 'SET_CLIPS',
		payload: clips,
	}
}

export const setCurrentClip = (clip: TwitchClip): Action => {
	return {
		type: 'SET_CURRENT_CLIP',
		payload: clip,
	}
}

export const setClipIndex = (clipIndex: number): Action => {
	return {
		type: 'SET_CLIP_INDEX',
		payload: clipIndex,
	}
}

export const updateClips = (clips: TwitchClipsResponse): Action => {
	return {
		type: 'UPDATE_CLIPS',
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
		case 'SET_CURRENT_CLIP':
			return {
				...state,
				currentClip: {
					...action.payload,
				},
			}

		case 'SET_CLIP_INDEX':
			return {
				...state,
				clipIndex: action.payload,
			}

		case 'UPDATE_CLIPS':
			return {
				...state,
				clips: {
					data: {
						...state.clips.data,
						...action.payload.data,
					},
					pagination: {
						cursor: action.payload.pagination.cursor,
					},
				},
			}
		default:
			return state
	}
}
