import { FC, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getFavourites } from 'src/common/localstorage'
import { apiTimePeriod } from 'src/types/search'

const Favourites: FC = () => {
	const [favourites, setFavourites] = useState([])

	useEffect(() => {
		const favouritesRes = getFavourites()

		setFavourites(favouritesRes)
	}, [])

	return <></>
}

export default Favourites
