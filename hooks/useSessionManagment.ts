import firebase from 'firebase/app'
import { AuthUserContext } from 'next-firebase-auth'
import { useState, useEffect } from 'react'
import { db } from '../configs/firebase'

const useSessionManagment = (user: AuthUserContext): void => {
	const [intervalId, setInternalId] = useState(null)

	useEffect(() => {
		if (!intervalId && user?.emailVerified) {
			const collection = db.collection('users').doc(user.id)
			let now = new Date()
			now.setMinutes(now.getMinutes() + 1)
			now = new Date(now)

			collection.update({ login: firebase.firestore.Timestamp.fromDate(now) }).catch(() => {
				throw new Error('Fallo al actualizar el documento')
			})
			setInternalId(
				setInterval(() => {
					let now = new Date()
					now.setMinutes(now.getMinutes() + 1)
					now = new Date(now)
					collection.update({ login: firebase.firestore.Timestamp.fromDate(now) }).catch(() => {
						throw new Error('Fallo al actualizar el documento')
					})
				}, 60000)
			)
		}

		if (!user?.emailVerified) {
			clearInterval(intervalId)
			setInternalId(null)
		}

		return () => {
			setInternalId(null) // This worked for me
		}
	}, [user])
}

export { useSessionManagment }
