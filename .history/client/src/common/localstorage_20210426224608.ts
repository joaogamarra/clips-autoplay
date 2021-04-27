export const getFavourites = () => {}

export const addFavourite = (channel: string) => {
	const storedFavourites = JSON.parse(localStorage.getItem('favourites') || '[]')

	const newFavourites = storedFavourites.push({ login: channel, rank: 0 })

	localStorage.setItem('favourites', JSON.stringify(newFavourites))
}
