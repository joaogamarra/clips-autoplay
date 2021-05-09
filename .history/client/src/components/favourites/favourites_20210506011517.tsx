import React, { FC, useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getFavourites, removeFavourite } from 'src/common/localstorage'
import { apiTimePeriod, searchClips } from 'src/types/search'
import './favourites.scss'
import { HeartFillIcon, XCircleFillIcon, HomeFillIcon } from '@primer/octicons-react'
import ChannelAndAvatar from '../channelAndAvatar/ChannelAndAvatar'

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
							<Link to='/' title='Homepage'>
								<HomeFillIcon size={30} />
								<span className='title-text'>Homepage</span>
							</Link>
						</h5>
						<h5 className='title-lg'>
							<HeartFillIcon size={30} className='favourites-icon' />
							<span className='title-text'>
								Your
								<br /> Favourites
							</span>
						</h5>
						{favourites.length > 0 ? (
							<ul className='favourites-list'>
								{favourites.map(({ search, avatar }) => (
									<li className='favourites-item' key={search.value}>
										<Link to={`/${search.mode}/${apiTimePeriod.week}/${search.value}`}>
											<ChannelAndAvatar src={avatar} name={search.value} />
										</Link>
										<button title='Remove Favourite' onClick={() => handleRemove(search)}>
											<XCircleFillIcon size={14} />
										</button>
									</li>
								))}
							</ul>
						) : (
							<p className='favourites-empty'>After you seach for clips your favorites will show up here</p>
						)}
					</div>
				</aside>
			)}
		</>
	)
}

export default Favourites
