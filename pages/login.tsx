import { withAuthUser, withAuthUserTokenSSR, AuthAction } from 'next-firebase-auth'
import { signInWithGoogle, signInWithGitHub } from '@/utils/auth'
import { CoffeeLoading } from 'react-loadingg'
import { ErrorBoundary, useErrorHandler } from 'react-error-boundary'
import { useState } from 'react'
import Layout from '@/components/Layout'

const Buttons = () => {
	const handleError = useErrorHandler()
	const bla = () => signInWithGoogle().catch(handleError)
	const ble = () => signInWithGitHub().catch(handleError)
	return (
		<>
			<button onClick={bla}>Login</button>
			<button onClick={ble}>Login Github</button>
		</>
	)
}
function ErrorFallback({ error }) {
	const [open, setDialog] = useState(true)
	return (
		<>
			<dialog open={open}>
				<p>Something went wrong:</p>
				<p style={{ color: 'red' }}>{error.message}</p>
				<button onClick={() => setDialog(!open)}>exit</button>
			</dialog>
			<Buttons />
		</>
	)
}
const Login = () => {
	return (
		<ErrorBoundary FallbackComponent={ErrorFallback}>
			<Buttons />
			<h1>Para poder acceder a esa página es necesario iniciar sesión</h1>
		</ErrorBoundary>
	)
}

Login.getLayout = function getLayout(page) {
	return <Layout>{page}</Layout>
}

export default withAuthUser({
	whenAuthed: AuthAction.REDIRECT_TO_APP,
	whenUnauthedBeforeInit: AuthAction.SHOW_LOADER,
	LoaderComponent: () => <CoffeeLoading />,
})(Login)

export const getServerSideProps = withAuthUserTokenSSR({
	whenAuthed: AuthAction.REDIRECT_TO_APP,
})()
