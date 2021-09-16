import { AuthUserContext } from 'next-firebase-auth'
import { useState, useEffect } from 'react'
import { updateLogin } from '@/utils/db'

const useSessionManagment = (user: AuthUserContext): void => {
	const [intervalId, setInternalId] = useState(null)
	useEffect(() => {
		if (!intervalId && user?.emailVerified) {
			updateLogin(user.id)
			setInternalId(
				setInterval(() => {
					updateLogin(user.id)
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
