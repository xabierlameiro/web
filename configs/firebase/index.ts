import firebase from 'firebase/app'

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

var provider = new firebase.auth.GoogleAuthProvider()
firebase.auth().languageCode = 'es'

export const signIn = () =>
	firebase
		.auth()
		.signInWithPopup(provider)
		.then((result) => {
			console.log('OK', result)
		})
		.catch((error) => {
			console.log('KO', error)
		})
export const signOut = () => firebase.auth().signOut()
