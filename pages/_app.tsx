import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { withAuthUser, useAuthUser } from 'next-firebase-auth'
import initAuth from 'configs/firebase/next-firebase-auth'
import { useSessionManagment } from '../hooks/useSessionManagment'

const queryClient = new QueryClient()

initAuth()

const App = ({ Component, pageProps }:any): JSX.Element => {
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
