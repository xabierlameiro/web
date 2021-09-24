import './styles.css'
import type { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { withAuthUser } from 'next-firebase-auth'
import { useSessionManagment } from '@/hooks/useSessionManagment'
import initAuth from '@/configs/firebase/next-firebase-auth'

import type { Page } from '../types/page'
type Props = AppProps & {
	Component: Page
}
const queryClient = new QueryClient()

initAuth()

const App: React.FC<AppProps> = ({ Component, pageProps }: Props): JSX.Element => {
	useSessionManagment()
	const getLayout = Component.getLayout || ((page) => page)

	return getLayout(
		<QueryClientProvider client={queryClient}>
			<Component {...pageProps} />
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	)
}
export default withAuthUser()(App)
