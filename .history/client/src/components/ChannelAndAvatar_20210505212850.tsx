import { FC } from 'react'

interface Props {
	src: string
	name: string
}

const ChannelAndAvatar: FC<Props> = ({ src, name }) => {
	return (
		<>
			<img width={30} src={src.replace('{width}', '50').replace('{height}', '67')} alt={name} />
			{name}
		</>
	)
}

export default ChannelAndAvatar
