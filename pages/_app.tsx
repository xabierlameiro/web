import type { FC } from 'react'
import type { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { withAuthUser, useAuthUser } from 'next-firebase-auth'
import { useSessionManagment } from '@/hooks/useSessionManagment'

import initAuth from '@/configs/firebase/next-firebase-auth'

const queryClient = new QueryClient()

initAuth()

const App: FC<AppProps> = ({ Component, pageProps }: AppProps): JSX.Element => {
	const user = useAuthUser()
	useSessionManagment(user)

	return (
		<QueryClientProvider client={queryClient}>
			<Component {...pageProps} />
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	)
}
export default withAuthUser()(App)
