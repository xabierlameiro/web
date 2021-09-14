import { withAuthUser, withAuthUserTokenSSR, AuthAction } from 'next-firebase-auth'
import { signInWithGoogle } from 'utils/db'

const Login = () => {
	const bla = () => signInWithGoogle()

	return (
		<div>
			<button onClick={bla}>Login</button>
		</div>
	)
}

export const getServerSideProps = withAuthUserTokenSSR({
	whenAuthed: AuthAction.REDIRECT_TO_APP,
})()

export default withAuthUser({ whenAuthed: AuthAction.REDIRECT_TO_APP })(Login)
