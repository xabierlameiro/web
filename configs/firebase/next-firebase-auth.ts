import { init } from 'next-firebase-auth'

const initAuth = (): void => {
	init({
		authPageURL: '/login',
		appPageURL: '/',
		loginAPIEndpoint: '/api/login', // required
		logoutAPIEndpoint: '/api/logout', // required
		// Required in most cases.
		firebaseAdminInitConfig: {
			credential: {
				projectId: 'weeb-cbe98',
				clientEmail: 'firebase-adminsdk-ejosy@weeb-cbe98.iam.gserviceaccount.com',
				// The private key must not be accesssible on the client side.
				privateKey: process.env.FIREBASE_PRIVATE_KEY
					? JSON.parse(process.env.FIREBASE_PRIVATE_KEY)
					: undefined,
			},
			databaseURL: 'https://weeb-cbe98-default-rtdb.europe-west1.firebasedatabase.app',
		},
		firebaseClientInitConfig: {
			apiKey: 'AIzaSyAk24ODstuf6_xDsNRacVJrnKDa_5jWl7Y',
			authDomain: 'weeb-cbe98.firebaseapp.com',
			projectId: 'weeb-cbe98',
			databaseURL: 'https://weeb-cbe98-default-rtdb.europe-west1.firebasedatabase.app',
		},
		cookies: {
			name: 'user', // required
			// Keys are required unless you set `signed` to `false`.
			// The keys cannot be accessible on the client side.
			keys: [process.env.COOKIE_SECRET_CURRENT, process.env.COOKIE_SECRET_PREVIOUS],
			httpOnly: true,
			maxAge: 1 * 60 * 60 * 24 * 1000, // twelve days
			overwrite: true,
			path: '/',
			sameSite: 'strict',
			secure: true, // set this to false in local (non-HTTPS) development
			signed: true,
		},
	})
}

export default initAuth
