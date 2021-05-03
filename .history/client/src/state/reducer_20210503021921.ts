import { State, Action } from 'src/types/state'
import { searchClips } from 'src/types/search'
import { ResponseClip, ResponseClips } from 'src/types/twitch'

export const setClips = (clips: ResponseClips): Action => {
	return {
		type: 'SET_CLIPS',
		payload: clips,
	}
}

export const setCurrentClip = (clip: ResponseClip): Action => {
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

export const updateClips = (clips: ResponseClips): Action => {
	return {
		type: 'UPDATE_CLIPS',
		payload: clips,
	}
}

export const setCurrentSearch = (search: searchClips): Action => {
	return {
		type: 'SET_CURRENT_SEARCH',
		payload: search,
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

		case 'SET_CURRENT_SEARCH':
			return {
				...state,
				currentSearch: action.payload,
			}
		default:
			return state
	}
}
