import React from 'react'
import { withAuthUser, withAuthUserTokenSSR, AuthAction } from 'next-firebase-auth'
import { signIn } from '../configs/firebase'

const Login = () => {
	const bla = () => signIn()

	return (
		<div>
			<button onClick={bla}>Login</button>
		</div>
	)
}

// Note that this is a higher-order function.

export const getServerSideProps = withAuthUserTokenSSR({
	whenAuthed: AuthAction.REDIRECT_TO_APP,
})()

export default withAuthUser({ whenAuthed: AuthAction.REDIRECT_TO_APP })(Login)
