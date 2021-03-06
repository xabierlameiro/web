import firebase from 'firebase/app'
import { setUser } from '@/utils/db'
import { goOffline } from '@/configs/firebase/real-time-database'
import type { AuthUser } from 'next-firebase-auth'

export const signIn = (
	provider: firebase.auth.GoogleAuthProvider | firebase.auth.GithubAuthProvider
): Promise<boolean | void | Error> =>
	new Promise((resolve, reject) => {
		try {
			firebase
				.auth()
				.signInWithPopup(provider)
				.then(({ user }) => {
					setUser(user)
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

export const signOut = ({ AuthUser }: { AuthUser: AuthUser }): Promise<boolean | Error> =>
	new Promise((resolve, reject) => {
		firebase
			.auth()
			.signOut()
			.then(() => {
				if (AuthUser) goOffline(AuthUser.id)
				resolve(true)
			})
			.catch((error) => {
				reject(error)
			})
	})
