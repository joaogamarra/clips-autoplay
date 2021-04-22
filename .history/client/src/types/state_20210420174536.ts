import { TwitchClipsResponse } from './twitch'

export type State = {
	clips: TwitchClipsResponse
}

export type Action = {
	type: 'SET_CLIPS'
	payload: TwitchClipsResponse
}
