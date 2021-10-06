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
	window.onbeforeunload = () => {
		if (firebase.auth().currentUser) {
			const { uid } = firebase.auth().currentUser
			logoutUser(uid)
		}
	}

	const isOnIOS =
		navigator.userAgent.match(/iPad/i) ||
		navigator.userAgent.match(/iPhone/i) ||
		navigator.userAgent.match(/android/i)
	const eventName = isOnIOS ? 'pagehide' : 'beforeunload'

	window.addEventListener(eventName, function () {
		if (firebase.auth().currentUser) {
			const { uid } = firebase.auth().currentUser
			logoutUser(uid)
		}
	})

	window.onunload = window.onbeforeunload = function () {
		if (firebase.auth().currentUser) {
			const { uid } = firebase.auth().currentUser
			logoutUser(uid)
		}
	}
}

const App: React.FC<AppProps> = ({ Component, pageProps }: Props): JSX.Element => {
	const getLayout = Component.getLayout || ((page) => page)

	return getLayout(<Component {...pageProps} />)
}
export default withAuthUser()(App)
