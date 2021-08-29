import { FC } from 'react'
import { MdCancel } from 'react-icons/md'
import { ResponseClip } from 'src/types/twitch'

interface Props {
	currentClip: ResponseClip
	handleComments: () => void
}

const CommentsBox: FC<Props> = ({ currentClip, handleComments }) => {
	return (
		<div className='comments-box'>
			<button className='btn-hide-comments' title='Hidde Comments' onClick={handleComments}>
				<MdCancel size={14} />
			</button>
			<div className='comments-container'>
				{currentClip.comments?.map(({ comment, author }, index) => (
					<div className='comments-item' key={index}>
						<span className='comment-author'>{`/u/${author}`}</span>
						<p>{comment}</p>
					</div>
				))}
			</div>

			{currentClip.comments_url && (
				<a
					className='link-comments'
					href={`https://reddit.com${currentClip.comments_url}`}
					target='_blank'
					rel='noreferrer'
					title='clip comments'
				>
					See All Comments
				</a>
			)}
		</div>
	)
}

export default CommentsBox
