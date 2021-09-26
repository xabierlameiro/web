import firebase from 'firebase/app'
import { updateUser, logoutUser } from '@/utils/db'

export const signIn = (
	provider: firebase.auth.GoogleAuthProvider | firebase.auth.GithubAuthProvider
): Promise<boolean | void | Error> =>
	new Promise((resolve, reject) => {
		try {
			firebase
				.auth()
				.signInWithPopup(provider)
				.then(({ user }) => {
					updateUser(user)
					resolve(true)
				})
				.catch((error) => {
					reject(error)
				})
		} catch (error) {
			reject(error)
		}
	})

export const signInWithGoogle = (): Promise<boolean | void | Error> =>
	signIn(new firebase.auth.GoogleAuthProvider())

export const signInWithGitHub = (): Promise<boolean | void | Error> =>
	signIn(new firebase.auth.GithubAuthProvider())

export const signOut = ({ user }: { user: firebase.User }): Promise<boolean | Error> =>
	new Promise((resolve, reject) => {
		firebase
			.auth()
			.signOut()
			.then(() => {
				if (user) logoutUser(user.uid)
				resolve(true)
			})
			.catch((error) => {
				reject(error)
			})
	})
