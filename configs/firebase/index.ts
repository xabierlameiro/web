import firebase from 'firebase/app'
import 'firebase/firestore'

if (!firebase.apps.length) {
	firebase.initializeApp({
		apiKey: 'AIzaSyAk24ODstuf6_xDsNRacVJrnKDa_5jWl7Y',
		authDomain: 'weeb-cbe98.firebaseapp.com',
		databaseURL: 'https://weeb-cbe98-default-rtdb.europe-west1.firebasedatabase.app',
		projectId: 'weeb-cbe98',
		storageBucket: 'weeb-cbe98.appspot.com',
		messagingSenderId: '765168771190',
		appId: '1:765168771190:web:ce9d3401864a539383ff57',
		measurementId: 'G-4NXSSZKVL7',
	})
} else {
	firebase.app()
}

const provider = new firebase.auth.GoogleAuthProvider()

firebase.auth().languageCode = 'es'

if (typeof window !== 'undefined') {
	firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
}

export const db = firebase.firestore()

export const signIn = (): Promise<void> =>
	firebase
		.auth()
		.signInWithPopup(provider)
		.then(({ user }) => {
			db.collection('users')
				.doc(user.uid)
				.set({
					uid: user.uid,
					name: user.displayName,
					photoURL: user.photoURL,
					email: user.email,
					login: firebase.firestore.Timestamp.fromDate(new Date()),
				})
				.then((e) => {
					console.log('Document successfully written!', e)
				})
				.catch((error) => {
					console.error('Error adding document: ', error)
				})
		})
		.catch((error) => {
			console.log('KO', error)
		})

export const signOut = (): Promise<void> => firebase.auth().signOut()
