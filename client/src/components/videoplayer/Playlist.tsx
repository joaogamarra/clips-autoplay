import { FC } from 'react'
import { MdCancel } from 'react-icons/md'
import { setClipIndex, setCurrentClip } from 'src/state/reducer'
import { useStateValue } from 'src/state/state'

interface Props {
	filterSeen: boolean
	playlistVisible: boolean
	hidePlaylist: () => void
}

const Playlist: FC<Props> = ({ filterSeen, playlistVisible, hidePlaylist }) => {
	const [{ clips, clipIndex }, dispatch] = useStateValue()
	const playlistClips = filterSeen ? clips.filtered : clips.data

	const setNewClip = (index: number) => {
		const clipsData = filterSeen ? clips.filtered : clips.data
		console.log(index)
		dispatch(setCurrentClip(clipsData[index]))
		dispatch(setClipIndex(index))
	}

	return (
		<div className={`playlist-container ${playlistVisible ? 'is-visible' : ''}`}>
			<button onClick={hidePlaylist} className='btn-hide-playlist' title='Hidde Playlist'>
				<MdCancel size={14} />
			</button>
			<ul className='playlist-list'>
				{playlistClips?.map(({ title, nsfw, seen }, index) => (
					<li
						className={`playlist-item ${clipIndex === index ? 'is-active' : ''}`}
						key={index}
						onClick={() => setNewClip(index)}
					>
						{title}
					</li>
				))}
			</ul>
		</div>
	)
}

export default Playlist
