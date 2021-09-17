import firebase from 'firebase/app'
import { getDateWithExtraMinutes } from './date'
import { db } from '@/firebase'

export const updateSession = (id: string): void => {
	const collection = db.collection('users').doc(id)
	collection
		.update({ login: firebase.firestore.Timestamp.fromDate(getDateWithExtraMinutes(1)) })
		.catch(() => {
			throw new Error('Fallo al actualizar el documento')
		})
}

export const userList = (): firebase.User[] => {
	const docs = []
	db.collection('users').onSnapshot((querySnapshot) => {
		querySnapshot.forEach((doc) => {
			docs.push(doc.data())
		})
	})
	return docs
}

export const updateUser = (user: firebase.User): void => {
	db.collection('users')
		.doc(user.uid)
		.set({
			uid: user.uid,
			name: user.displayName,
			photoURL: user.photoURL,
			email: user.email,
			login: firebase.firestore.Timestamp.fromDate(new Date()),
		})
		.catch((error) => {
			throw new Error(`Error al añadir el documento ${error}`)
		})
}
