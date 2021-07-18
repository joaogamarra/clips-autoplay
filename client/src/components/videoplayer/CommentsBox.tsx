import { FC } from 'react'
import { ResponseClip } from 'src/types/twitch'

interface Props {
	currentClip: ResponseClip
}

const CommentsBox: FC<Props> = ({ currentClip }) => {
	return (
		<div className='comments-box'>
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
