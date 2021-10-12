import firebase from 'firebase/app'
import { db } from '@/firebase'

export const userList = (): firebase.User[] => {
	const docs = []
	db.collection('users').onSnapshot((querySnapshot) => {
		querySnapshot.forEach((doc) => {
			docs.push(doc.data())
		})
	})
	return docs
}

export const setUser = (user: firebase.User): void => {
	db.collection('users')
		.doc(user.uid)
		.set(
			{
				uid: user.uid,
				name: user.displayName,
				photoURL: user.photoURL,
				email: user.email,
			},
			{ merge: true }
		)
		.catch((error) => {
			throw new Error(`Error al añadir el documento ${error}`)
		})
}

export const updateUser = (userId: string, data: Object): void => {
	db.collection('users')
		.doc(userId)
		.update(data)
		.catch((error) => {
			throw new Error(`Error al añadir el documento ${error}`)
		})
}
