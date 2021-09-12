import React from 'react'
import { useAuthUser, withAuthUser, withAuthUserTokenSSR, AuthAction } from 'next-firebase-auth'
import { signOut } from '../configs/firebase'

const Demo = () => {
	const user = useAuthUser()
	return (
		<div>
			<p>uid : {user.id}</p>
			<p>name : {user.displayName}</p>
			<img src={user.photoURL} alt={user.displayName} />
			<br />
			<button onClick={() => signOut()}>Logout</button>
		</div>
	)
}

export const getServerSideProps = withAuthUserTokenSSR({
	whenUnauthed: AuthAction.REDIRECT_TO_LOGIN,
})()

export default withAuthUser({ whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN })(Demo)
