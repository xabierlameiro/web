import firebase from 'firebase/app'
import { db } from '@/firebase'
import { AuthUser } from 'next-firebase-auth'

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
			logged: true,
		})
		.catch((error) => {
			throw new Error(`Error al añadir el documento ${error}`)
		})
}

export const logoutUser = ({ user }: { user: AuthUser }): void => {
	db.collection('users')
		.doc(user.id)
		.update({
			logged: false,
		})
		.catch((error) => {
			throw new Error(`Error al añadir el documento ${error}`)
		})
}
