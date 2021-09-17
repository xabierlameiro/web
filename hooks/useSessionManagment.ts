import { useState, useEffect } from 'react'
import { AuthUserContext } from 'next-firebase-auth'
import { updateSession } from '@/utils/db'

const useSessionManagment = (user: AuthUserContext): void => {
	const [intervalId, setInternalId] = useState(null)
	useEffect(() => {
		if (!intervalId && user?.emailVerified) {
			updateSession(user.id)
			setInternalId(
				setInterval(() => {
					updateSession(user.id)
				}, 60000)
			)
		}

		if (!user?.emailVerified) {
			clearInterval(intervalId)
			setInternalId(null)
		}
	}, [user, intervalId])
}

export { useSessionManagment }
