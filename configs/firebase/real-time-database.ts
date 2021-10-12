import firebase from 'firebase/app'
import 'firebase/database'
import { db, rtdb } from '@/firebase'

const isOfflineForDatabase = {
	state: 'offline',
	last_changed: firebase.database.ServerValue.TIMESTAMP,
}

const isOnlineForDatabase = {
	state: 'online',
	last_changed: firebase.database.ServerValue.TIMESTAMP,
}
const isOfflineForFirestore = {
	state: 'offline',
	last_changed: firebase.firestore.FieldValue.serverTimestamp(),
}

const isOnlineForFirestore = {
	state: 'online',
	last_changed: firebase.firestore.FieldValue.serverTimestamp(),
}

const updatePresence = (): void => {
	const uid = firebase.auth().currentUser.uid

	const userStatusDatabaseRef = rtdb.ref('/status/' + uid)
	const userStatusFirestoreRef = db.collection('users').doc(uid)

	rtdb.ref('.info/connected').on('value', function (snapshot) {
		if (snapshot.val() === false) {
			userStatusFirestoreRef.update(isOfflineForFirestore)
			return
		}

		userStatusDatabaseRef
			.onDisconnect()
			.set(isOfflineForDatabase)
			.then(function () {
				userStatusDatabaseRef.set(isOnlineForDatabase)
				userStatusFirestoreRef.update(isOnlineForFirestore)
			})
	})
}

const goOffline = (uid: string): void => {
	const userStatusDatabaseRef = rtdb.ref('/status/' + uid)
	const userStatusFirestoreRef = db.collection('users').doc(uid)

	rtdb.ref('.info/connected').on('value', function (snapshot) {
		if (snapshot.val() === false) {
			userStatusFirestoreRef.update(isOfflineForFirestore)
			return
		}
		userStatusDatabaseRef.set(isOfflineForDatabase)
	})
}

export { updatePresence, goOffline }
