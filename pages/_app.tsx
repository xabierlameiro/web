import './styles.css'
import type { AppProps } from 'next/app'
import { withAuthUser } from 'next-firebase-auth'
import initAuth from '@/configs/firebase/next-firebase-auth'
import firebase from 'firebase/app'
import { logoutUser } from '@/utils/db'

import type { Page } from '../types/page'

type Props = AppProps & {
	Component: Page
}

initAuth()

if (process.browser) {
	window.onunload = window.onbeforeunload = () => {
		if (firebase.auth().currentUser) {
			const { uid } = firebase.auth().currentUser
			logoutUser(uid)
		}
	}
}

if (typeof window !== 'undefined') {
	window.document.addEventListener('resume', () => {
		if (firebase.auth().currentUser) {
			const { uid } = firebase.auth().currentUser
			logoutUser(uid)
		}
	})
	window.addEventListener('beforeunload', function (e) {
		if (firebase.auth().currentUser) {
			const { uid } = firebase.auth().currentUser
			logoutUser(uid)
		}
	})
	window.addEventListener('onunload', function (e) {
		if (firebase.auth().currentUser) {
			const { uid } = firebase.auth().currentUser
			logoutUser(uid)
		}
	})
}
firebase.auth().onAuthStateChanged((user) => {
	if (!user) {
		logoutUser(user.uid)
	}
})
const App: React.FC<AppProps> = ({ Component, pageProps }: Props): JSX.Element => {
	const getLayout = Component.getLayout || ((page) => page)

	return getLayout(<Component {...pageProps} />)
}
export default withAuthUser()(App)
