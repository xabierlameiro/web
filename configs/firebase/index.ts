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

firebase.auth().languageCode = 'es'

if (typeof window !== 'undefined') {
	firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
}

export const db = firebase.firestore()