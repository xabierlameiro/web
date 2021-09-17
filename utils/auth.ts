import firebase from 'firebase/app'
import { updateUser } from './db'

export const signInWithGoogle = (): Promise<boolean | void | Error> =>
	new Promise((resolve, reject) => {
		firebase
			.auth()
			.signInWithPopup(new firebase.auth.GoogleAuthProvider())
			.then(({ user }) => {
				updateUser(user)
				resolve(true)
			})
			.catch((error) => {
				reject(error)
			})
	})

export const signInWithGitHub = (): Promise<boolean | void | Error> =>
	new Promise((resolve, reject) => {
		firebase
			.auth()
			.signInWithPopup(new firebase.auth.GithubAuthProvider())
			.then(({ user }) => {
				updateUser(user)
				resolve(true)
			})
			.catch((error) => {
				reject(error)
			})
	})

export const signOut = (): Promise<boolean | void | Error> =>
	new Promise((resolve, reject) => {
		firebase
			.auth()
			.signOut()
			.then(() => resolve(true))
			.catch((error) => {
				reject(error)
			})
	})
