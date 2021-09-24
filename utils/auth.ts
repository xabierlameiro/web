import firebase from 'firebase/app'
import { updateUser, logoutUser } from '@/utils/db'
import { AuthUser } from 'next-firebase-auth'

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

export const signOut = ({ user }: { user: AuthUser }): Promise<boolean | Error> =>
	new Promise((resolve, reject) => {
		firebase
			.auth()
			.signOut()
			.then(() => {
				logoutUser({ user })
				resolve(true)
			})
			.catch((error) => {
				reject(error)
			})
	})
