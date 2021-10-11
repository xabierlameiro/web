import firebase from 'firebase/app'
import 'firebase/database'

const updatePresence = (): void => {
	const uid = firebase.auth().currentUser.uid

	const userStatusDatabaseRef = firebase.database().ref('/status/' + uid)

	const isOfflineForDatabase = {
		state: 'offline',
		last_changed: firebase.database.ServerValue.TIMESTAMP,
	}

	const isOnlineForDatabase = {
		state: 'online',
		last_changed: firebase.database.ServerValue.TIMESTAMP,
	}

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
