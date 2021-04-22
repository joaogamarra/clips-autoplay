import { currentSearch } from './search'
import { TwitchClip, TwitchClipsResponse } from './twitch'

export type State = {
	clips: TwitchClipsResponse
	currentClip: TwitchClip
	clipIndex: number
	currentSearch: currentSearch
}

export type Action =
	| {
			type: 'SET_CLIPS'
			payload: TwitchClipsResponse
	  }
	| {
			type: 'SET_CURRENT_CLIP'
			payload: TwitchClip
	  }
	| {
			type: 'SET_CLIP_INDEX'
			payload: number
	  }
	| {
			type: 'UPDATE_CLIPS'
			payload: TwitchClipsResponse
	  }
	| {
			type: 'SET_SEARCH_MODE'
			payload: currentSearch
	  }
