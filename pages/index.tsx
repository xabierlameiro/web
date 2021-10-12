import { useEffect, useState } from 'react'
import { db } from '@/firebase'
import Layout from '@/components/Layout'

const Index = (): JSX.Element => {
	// const user = useAuthUser()
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
			{users?.map((user) => (
				<p key={user.uid}>{`login : ${user.state}`}</p>
			))}
		</div>
	)
}

Index.getLayout = function getLayout(page) {
	return <Layout>{page}</Layout>
}

export default Index
