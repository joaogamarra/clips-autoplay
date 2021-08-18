import React, { FC, useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getFavourites, removeFavourite } from 'src/common/localstorage'
import { apiTimePeriod, searchClips } from 'src/types/search'
import './sidebar.scss'
import { HeartFillIcon, XCircleFillIcon, SearchIcon } from '@primer/octicons-react'
import ChannelAndAvatar from '../common/channelAndAvatar/ChannelAndAvatar'
import { useStateValue } from 'src/state/state'
import { setFavourites } from 'src/state/reducer'

const Sidebar: FC = () => {
	const [{ favourites }, dispatch] = useStateValue()
	const [favouritesVisible, setFavouritesVisible] = useState(false)

	const loadFavourites = useCallback(() => {
		const favouritesRes = getFavourites()

		dispatch(setFavourites(favouritesRes))
	}, [dispatch])

	useEffect(() => {
		loadFavourites()
	}, [loadFavourites])

	const handleFavouriteClick = (show?: boolean) => {
		if (!favouritesVisible && show === true) {
			setFavouritesVisible(true)
			document.body.style.overflow = 'hidden'
		} else {
			setFavouritesVisible(false)
			document.querySelector('.favourites-bar')?.scrollTo({ top: 0 })
			document.body.style.overflow = 'unset'
		}
	}

	const handleRemove = (search: searchClips) => {
		removeFavourite(search)
		loadFavourites()
	}

	return (
		<>
			{favourites && (
				<aside className={`favourites-bar ${favouritesVisible === true ? 'is-visible' : ''}`}>
					<div className='favourites-container'>
						<h5 className='title-lg'>
							<Link to='/' title='Homepage' onClick={() => handleFavouriteClick()}>
								<SearchIcon size={30} className='sidebar-icon' />
								<span className='title-text'>Search</span>
							</Link>
						</h5>

						<button className='title-lg' onClick={() => handleFavouriteClick(true)}>
							<HeartFillIcon size={30} className='sidebar-icon' />
							<span className='title-text'>
								Your
								<br /> Favourites
							</span>
						</button>
						{favourites.length > 0 ? (
							<ul className='favourites-list'>
								{favourites.map(({ search, avatar }) => (
									<li className='favourites-item' key={search.value}>
										<Link
											to={`/${search.mode}/${apiTimePeriod.day}/${search.value}${search.sort ? '/hot' : ''}`}
											onClick={() => handleFavouriteClick()}
										>
											<ChannelAndAvatar src={avatar} name={search.value} type={search.mode} />
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

export default Sidebar
