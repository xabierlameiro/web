import firebase from 'firebase/app'
import 'firebase/database'

const updatePresence = (): void => {
	const uid = firebase.auth().currentUser.uid

	const userStatusDatabaseRef = firebase.database().ref('/status/' + uid)
	const userStatusFirestoreRef = firebase.firestore().doc('/status/' + uid)

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

	firebase
		.database()
		.ref('.info/connected')
		.on('value', function (snapshot) {
			if (snapshot.val() === false) {
				userStatusFirestoreRef.set(isOfflineForFirestore)
				return
			}

			userStatusDatabaseRef
				.onDisconnect()
				.set(isOfflineForDatabase)
				.then(function () {
					userStatusDatabaseRef.set(isOnlineForDatabase)
					userStatusFirestoreRef.set(isOnlineForFirestore)
				})
		})

	firebase
		.database()
		.ref('.info/connected')
		.on('value', function (snapshot) {
			if (snapshot.val() === false) {
				return
			}

			userStatusDatabaseRef
				.onDisconnect()
				.set(isOfflineForDatabase)
				.then(function () {
					userStatusDatabaseRef.set(isOnlineForDatabase)
				})
		})
}

const goOffline = (uid: string): void => {
	const userStatusDatabaseRef = firebase.database().ref('/status/' + uid)

	const isOfflineForDatabase = {
		state: 'offline',
		last_changed: firebase.database.ServerValue.TIMESTAMP,
	}

	firebase
		.database()
		.ref('.info/connected')
		.on('value', function (snapshot) {
			if (snapshot.val() === false) {
				return
			}
			userStatusDatabaseRef.set(isOfflineForDatabase)
		})

	firebase
		.database()
		.ref('.info/connected')
		.on('value', function (snapshot) {
			if (snapshot.val() === false) {
				return
			}

			userStatusDatabaseRef.set(isOfflineForDatabase)
		})
}

export { updatePresence, goOffline }
