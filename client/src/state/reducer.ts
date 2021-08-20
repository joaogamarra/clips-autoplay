import { State, Action } from 'src/types/state'
import { searchClips } from 'src/types/search'
import { favouritesType, ResponseClip, ResponseClips } from 'src/types/twitch'

export const setClips = (clips: ResponseClips): Action => {
	return {
		type: 'SET_CLIPS',
		payload: clips
	}
}

export const setCurrentClip = (clip: ResponseClip): Action => {
	return {
		type: 'SET_CURRENT_CLIP',
		payload: clip
	}
}

export const setClipIndex = (clipIndex: number): Action => {
	return {
		type: 'SET_CLIP_INDEX',
		payload: clipIndex
	}
}

export const updateClips = (clips: ResponseClips): Action => {
	return {
		type: 'UPDATE_CLIPS',
		payload: clips
	}
}

export const setFilteredClips = (clips: ResponseClip[]): Action => {
	return {
		type: 'SET_FILTERED_CLIPS',
		payload: clips
	}
}

export const setClipSeen = (clip: ResponseClip): Action => {
	return {
		type: 'CLIP_SEEN',
		payload: clip
	}
}

export const setCurrentSearch = (search: searchClips): Action => {
	return {
		type: 'SET_CURRENT_SEARCH',
		payload: search
	}
}

export const setFavourites = (favourites: favouritesType[]): Action => {
	return {
		type: 'SET_FAVOURITES',
		payload: favourites
	}
}

export const reducer = (state: State, action: Action): State => {
	switch (action.type) {
		case 'SET_CLIPS':
			return {
				...state,
				clips: {
					...action.payload
				}
			}
		case 'SET_CURRENT_CLIP':
			return {
				...state,
				currentClip: {
					...action.payload
				}
			}

		case 'SET_CLIP_INDEX':
			return {
				...state,
				clipIndex: action.payload
			}

		case 'UPDATE_CLIPS':
			const data = state.clips.data.concat(action.payload.data)
			return {
				...state,
				clips: {
					...state.clips,
					data,
					pagination: {
						cursor: action.payload.pagination.cursor
					}
				}
			}

		case 'SET_FILTERED_CLIPS':
			let dataFiltered
			if (state.clips.filtered) {
				dataFiltered = state.clips.filtered.concat(action.payload)
			} else {
				dataFiltered = action.payload
			}
			return {
				...state,
				clips: {
					...state.clips,
					filtered: dataFiltered
				}
			}

		case 'CLIP_SEEN':
			const changedClip = {
				...action.payload,
				seen: true
			}
			const newClipsData = state.clips.data.map((clip) => {
				return clip?.twitch_url !== action.payload.twitch_url ? clip : changedClip
			})
			return {
				...state,
				clips: {
					...state.clips,
					data: newClipsData
				}
			}

		case 'SET_CURRENT_SEARCH':
			return {
				...state,
				currentSearch: action.payload
			}

		case 'SET_FAVOURITES':
			return {
				...state,
				favourites: action.payload
			}
		default:
			return state
	}
}
