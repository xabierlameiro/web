import { useEffect, useState } from 'react'
// import { useAuthUser } from 'next-firebase-auth'
// import { signOut } from '@/utils/auth'
// import Image from 'next/image'
import { rtdb } from '@/firebase'
import Layout from '@/components/Layout'

const Index = (): JSX.Element => {
	// const user = useAuthUser()
	const [users, setUsers] = useState([])

	useEffect(() => {
		rtdb.ref('status').on('value', (snapshot) => {
			const docs = []
			snapshot.forEach((childSnapshot) => {
				docs.push(childSnapshot.val())
				// ...
			})
			setUsers(docs)
		})

		return () => {
			setUsers([])
		}
	}, [])

	return (
		<div>
			{users?.map((user, index) => (
				<p key={index}>{`login : ${user.state}`}</p>
			))}
		</div>
	)
}

Index.getLayout = function getLayout(page) {
	return <Layout>{page}</Layout>
}

export default Index
