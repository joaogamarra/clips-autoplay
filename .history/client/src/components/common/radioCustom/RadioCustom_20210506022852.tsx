import React, { FC } from 'react'

interface Props {
	id: string
	name: string
	checked: boolean
	value: string
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const RadioCustom: FC<Props> = ({ id, name, checked, value, onChange }) => {
	return (
		<div className='radio-wrapper'>
			<input id={id} type='radio' name={name} checked={checked} value={value} onChange={onChange} />
		</div>
	)
}

export default RadioCustom
