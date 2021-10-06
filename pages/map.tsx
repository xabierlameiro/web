import { useEffect, useState } from 'react'
import { withAuthUser, withAuthUserTokenSSR, AuthAction } from 'next-firebase-auth'
import { Map } from '@/components/Map'
import Layout from '@/components/Layout'

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

	return <Map />
}

Index.getLayout = function getLayout(page) {
	return <Layout>{page}</Layout>
}

export default withAuthUser({
	whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
	whenUnauthedBeforeInit: AuthAction.SHOW_LOADER,
	LoaderComponent: () => <CoffeeLoading />,
})(Index)

export const getServerSideProps = withAuthUserTokenSSR({
	whenUnauthed: AuthAction.REDIRECT_TO_LOGIN,
})()
