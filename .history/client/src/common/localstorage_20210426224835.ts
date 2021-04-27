export const getFavourites = () => {}

export const addFavourite = (channel: string) => {
	const storedFavourites = JSON.parse(localStorage.getItem('favourites') || '[]')

	console.log(storedFavourites)

	const newFavourites = storedFavourites.concat({ login: channel, rank: 0 })

	localStorage.setItem('favourites', JSON.stringify(newFavourites))
}
