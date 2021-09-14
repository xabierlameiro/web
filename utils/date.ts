export const getDateWithExtraMinutes = (minutes: number): Date => {
	const now = new Date()
	now.setMinutes(now.getMinutes() + minutes)
	return new Date(now)
}

export const getDateFromFirestore = (hour: number): string => {
	return new Date(hour * 1000).toLocaleDateString('es')
}

export const hasUserLoggedIn = (time: number): string => {
	return time >= new Date().getTime() ? 'online' : 'offline'
}
