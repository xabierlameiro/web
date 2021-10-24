import './styles.css'
import type { AppProps } from 'next/app'
import { withAuthUser } from 'next-firebase-auth'
import initAuth from '@/configs/firebase/next-firebase-auth'

import GlobalStyle from '@/styles/global'
import { ThemeProvider } from 'styled-components'
import theme from '@/styles/theme'

import type { Page } from '../types/page'

type Props = AppProps & {
	Component: Page
}

initAuth()

const App: React.FC<AppProps> = ({ Component, pageProps }: Props): JSX.Element => {
	const getLayout = Component.getLayout || ((page) => page)

	return getLayout(
		<ThemeProvider theme={theme}>
			<Component {...pageProps} />
			<GlobalStyle />
		</ThemeProvider>
	)
}
export default withAuthUser()(App)
