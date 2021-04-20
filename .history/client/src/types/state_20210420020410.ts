import { TwitchClip } from './twitch'

export type State = {
	clips: TwitchClip[]
}

export type Action = {
	type: 'SET_CLIPS'
	payload: TwitchClip[]
}
