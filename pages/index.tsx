import React from 'react'
import { useAuthUser, withAuthUser, withAuthUserTokenSSR } from 'next-firebase-auth'
import { signIn, signOut } from '../configs/firebase'
const Demo = () => {
	const AuthUser = useAuthUser()
	const bla = () => signIn()
	const ble = () => signOut()
	return (
		<div>
			<p>Your email is {AuthUser.email ? AuthUser.email : 'unknown'}.</p>
			<button onClick={bla}>Login</button>
			<button onClick={ble}>Logout</button>
		</div>
	)
}

// Note that this is a higher-order function.
export const getServerSideProps = withAuthUserTokenSSR()()

export default withAuthUser()(Demo)
