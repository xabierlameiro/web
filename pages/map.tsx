import { useEffect, useState } from 'react'
import { useAuthUser, withAuthUser, withAuthUserTokenSSR, AuthAction } from 'next-firebase-auth'
import { Map } from '@/components/Map'
import { db } from '@/firebase'
import { CoffeeLoading } from 'react-loadingg'

const Index = (): JSX.Element => {
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

	console.log(users)

	return <Map />
}

export default withAuthUser({
	whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
	whenUnauthedBeforeInit: AuthAction.SHOW_LOADER,
	LoaderComponent: () => <CoffeeLoading />,
})(Index)

export const getServerSideProps = withAuthUserTokenSSR({
	whenUnauthed: AuthAction.REDIRECT_TO_LOGIN,
})()
