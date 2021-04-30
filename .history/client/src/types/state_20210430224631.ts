import { searchClips } from './search'
import { SubredditClip, SubredditClipsResponse } from './subreddit'
import { TwitchClip, TwitchClipsResponse } from './twitch'

export type ClipsResponseType = TwitchClipsResponse | SubredditClipsResponse
export type ClipType = TwitchClip | SubredditClip

export type State = {
	clips: ClipsResponseType
	currentClip: ClipType
	clipIndex: number
	currentSearch: searchClips
}

export type Action =
	| {
			type: 'SET_CLIPS'
			payload: ClipsResponseType
	  }
	| {
			type: 'SET_CURRENT_CLIP'
			payload: ClipType
	  }
	| {
			type: 'SET_CLIP_INDEX'
			payload: number
	  }
	| {
			type: 'UPDATE_CLIPS'
			payload: ClipsResponseType
	  }
	| {
			type: 'SET_CURRENT_SEARCH'
			payload: searchClips
	  }
