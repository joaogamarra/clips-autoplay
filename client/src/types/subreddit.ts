export interface SubredditClipsResponse {
	data: SubredditClip[]
	pagination: {
		cursor: string
	}
}

export interface SubredditClip {
	embed_url: string
}
