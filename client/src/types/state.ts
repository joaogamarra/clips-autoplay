import { searchClips } from './search'
import { ResponseClip, ResponseClips, favouritesType } from './twitch'

export type State = {
	clips: ResponseClips
	currentClip: ResponseClip
	clipIndex: number
	currentSearch: searchClips
	favourites: favouritesType[]
}

export type Action =
	| {
			type: 'SET_CLIPS'
			payload: ResponseClips
	  }
	| {
			type: 'SET_CURRENT_CLIP'
			payload: ResponseClip
	  }
	| {
			type: 'SET_CLIP_INDEX'
			payload: number
	  }
	| {
			type: 'SET_FILTERED_CLIPS'
			payload: ResponseClip[]
	  }
	| {
			type: 'UPDATE_CLIPS'
			payload: ResponseClips
	  }
	| {
			type: 'CLIP_SEEN'
			payload: ResponseClip
	  }
	| {
			type: 'SET_CURRENT_SEARCH'
			payload: searchClips
	  }
	| {
			type: 'SET_FAVOURITES'
			payload: favouritesType[]
	  }
