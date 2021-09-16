import { useEffect, useState } from 'react'
import { useAuthUser, withAuthUser, withAuthUserTokenSSR, AuthAction } from 'next-firebase-auth'
import { hasUserLoggedIn, getDateFromFirestore } from '@/utils/date'
import { signOut } from '@/utils/db'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import { db } from '@/firebase'

const DynamicComponentWithNoSSR = dynamic(() => import('../components/Map'), {
	ssr: false,
	loading: () => <p>Loading...</p>,
})

const Index = () => {
	const user = useAuthUser()
	const [users, setUsers] = useState([])

	useEffect(() => {
		db.collection('users').onSnapshot((querySnapshot) => {
			const docs = []
			querySnapshot.forEach((doc) => {
				docs.push(doc.data())
			})
			setUsers(docs)
		})
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
			<DynamicComponentWithNoSSR />
		</div>
	)
}

export const getServerSideProps = withAuthUserTokenSSR({
	whenUnauthed: AuthAction.REDIRECT_TO_LOGIN,
})()

export default withAuthUser({ whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN })(Index)
