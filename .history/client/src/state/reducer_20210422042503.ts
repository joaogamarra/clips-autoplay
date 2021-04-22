import { TwitchClip, TwitchClipsResponse } from 'src/types/twitch'
import { State, Action } from 'src/types/state'
import { searchType } from 'src/types/search'

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

export const setSearchMode = (mode: searchType): Action => {
	return {
		type: 'SET_SEARCH_MODE',
		payload: mode,
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
			const data = state.clips.data.concat(action.payload.data)
			return {
				...state,
				clips: {
					data,
					pagination: {
						cursor: action.payload.pagination.cursor,
					},
				},
			}

		case 'SET_SEARCH_MODE':
			return {
				...state,
				searchMode: action.payload,
			}
		default:
			return state
	}
}
