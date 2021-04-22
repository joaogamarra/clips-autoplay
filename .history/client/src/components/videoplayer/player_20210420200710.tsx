import { useCallback, useEffect, useState } from 'react'
import { useStateValue } from 'src/state/state'
import { TwitchClip } from 'src/types/twitch'

const Player: React.FC = () => {
	const [{ clips }] = useStateValue()
	const [currentClip, setCurrentClip] = useState<TwitchClip>()
	const [clipIndex, setClipIndex] = useState<number>(0)
	const urlParams = '&parent=localhost&autoplay=true'

	const nextClip = useCallback(() => {
		if (currentClip) {
			setClipIndex(clipIndex + 1)
			console.log(clipIndex)
		}
	}, [currentClip, clipIndex])

	const autoplayStart = useCallback(() => {
		setCurrentClip(clips.data[0])
		setClipIndex(0)
		nextClip()
	}, [clips])

	useEffect(() => {
		console.log('file: player.tsx ~ line 6 ~ clips', clips)

		autoplayStart()
	}, [clips, autoplayStart])

	return (
		<>
			{currentClip && (
				<iframe
					className='video-iframe'
					title='Twitch Embed'
					frameBorder='0'
					allowFullScreen={true}
					src={`${currentClip?.embed_url}${urlParams}`}
					height='378'
					width='620'
				></iframe>
			)}
		</>
	)
}

export default Player
