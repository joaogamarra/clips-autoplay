import React, { FC, useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getFavourites, removeFavourite } from 'src/common/localstorage'
import { apiTimePeriod, searchClips } from 'src/types/search'
import './favourites.scss'
import { HeartFillIcon, XCircleFillIcon } from '@primer/octicons-react'

const Favourites: FC = () => {
	const [favourites, setFavourites] = useState<{ search: searchClips; rank: number; avatar: string }[]>([])

	const loadFavourites = useCallback(() => {
		const favouritesRes = getFavourites()

		setFavourites(favouritesRes)
	}, [])

	useEffect(() => {
		loadFavourites()
	}, [loadFavourites])

	const handleRemove = (search: searchClips) => {
		removeFavourite(search)
		loadFavourites()
	}

	return (
		<>
			{favourites && (
				<aside className='favourites-bar'>
					<div className='favourites-container'>
						<h5 className='title-lg'>
							<HeartFillIcon size={30} className='favourites-icon' />
							<span className='title-text'>
								Your
								<br /> Favourites
							</span>
						</h5>
						<ul className='favourites-list'>
							{favourites.map(({ search, avatar }) => (
								<li className='favourites-item' key={search.value}>
									<Link to={`/${search.mode}/${apiTimePeriod.week}/${search.value}`}>
										<img className='item-avatar' src={avatar} width={30} alt={search.value} />
										{search.value}
									</Link>
									<button title='Remove Favourite' onClick={() => handleRemove(search)}>
										<XCircleFillIcon size={16} />
									</button>
								</li>
							))}
						</ul>
					</div>
				</aside>
			)}
		</>
	)
}

export default Favourites
