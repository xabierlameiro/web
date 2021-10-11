import { useEffect, useState } from 'react'
// import { useAuthUser } from 'next-firebase-auth'
// import { signOut } from '@/utils/auth'
// import Image from 'next/image'
import { db, rtdb } from '@/firebase'
import Layout from '@/components/Layout'

const Index = (): JSX.Element => {
	// const user = useAuthUser()
	const [users, setUsers] = useState([])
	const [dbusers, setDBUsers] = useState([])

	useEffect(() => {
		db.collection('users').onSnapshot((querySnapshot) => {
			const docs = []
			querySnapshot.forEach((doc) => {
				docs.push(doc.data())
			})
			setUsers(docs)
		})

		rtdb.ref('status').on('value', (snapshot) => {
			const docs = []
			snapshot.forEach((childSnapshot) => {
				docs.push(childSnapshot.val())
				// ...
			})
			setDBUsers(docs)
		})

		return () => {
			setUsers([])
		}
	}, [])

	return (
		<div>
			{dbusers?.map((user) => (
				<p key={user.state}>{`login : ${user.state}`}</p>
			))}
		</div>
	)
}

Index.getLayout = function getLayout(page) {
	return <Layout>{page}</Layout>
}

export default Index
