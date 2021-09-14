import { useEffect, useState } from 'react'
import { useAuthUser, withAuthUser, withAuthUserTokenSSR, AuthAction } from 'next-firebase-auth'
import { hasUserLoggedIn, getDateFromFirestore } from 'utils/date'
import { userList, signOut } from 'utils/db'
import Image from 'next/image'

const Index = () => {
	const user = useAuthUser()
	const [users, setUsers] = useState([])

	useEffect(() => {
		setUsers(userList())
		return () => {
			setUsers([])
		}
	}, [])

	return (
		<div>
			<p>uid : {user.id}</p>
			<p>name : {user.displayName}</p>
			{user.photoURL && (
				<Image src={user.photoURL} alt={user.displayName} width='200px' height='200px' />
			)}
			<br />
			<button onClick={() => signOut()}>Logout</button>
			{users?.map((user) => (
				<p key={user.uid}>
					{getDateFromFirestore(user.login.seconds)}
					{hasUserLoggedIn(user.login.toDate().getTime())}
				</p>
			))}
		</div>
	)
}

export const getServerSideProps = withAuthUserTokenSSR({
	whenUnauthed: AuthAction.REDIRECT_TO_LOGIN,
})()

export default withAuthUser({ whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN })(Index)
