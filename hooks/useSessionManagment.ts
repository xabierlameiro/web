import { useState, useEffect } from 'react'

const useSessionManagment = (user) => {
	const [intervalId, setInternalId] = useState(undefined)

	useEffect(() => {
		if (typeof intervalId === 'undefined' && user?.emailVerified) {
			setInternalId(
				setInterval(function () {
					//TODO: Guardar sesion en firestore
					console.log('HOLA')
				}, 3000)
			)
		}

		if (!user?.emailVerified) {
			clearInterval(intervalId)
			setInternalId(undefined)
		}
	}, [user])
}
export { useSessionManagment }
