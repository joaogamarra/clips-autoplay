import React, { FC } from 'react'
import './loader.scss'

interface Props {
	visible: string
}

const Loader: FC<Props> = ({ visible }) => {
	return <div className={`loader ${visible}`}>Loading...</div>
}

export default Loader
