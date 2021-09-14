import { withAuthUser, withAuthUserTokenSSR, AuthAction } from 'next-firebase-auth'
import { signInWithGoogle, signInWithGitHub } from 'utils/db'

const Login = () => {
	const bla = () => signInWithGoogle()
	const ble = () => signInWithGitHub()

	return (
		<div>
			<button onClick={bla}>Login</button>
			<button onClick={ble}>Login Github</button>
		</div>
	)
}

export const getServerSideProps = withAuthUserTokenSSR({
	whenAuthed: AuthAction.REDIRECT_TO_APP,
})()

export default withAuthUser({ whenAuthed: AuthAction.REDIRECT_TO_APP })(Login)
