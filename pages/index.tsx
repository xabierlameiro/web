import { useEffect, useState } from 'react'
// import { useAuthUser } from 'next-firebase-auth'
// import { signOut } from '@/utils/auth'
// import Image from 'next/image'
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
			{/* <p>uid : {user.id}</p>
			<p>name : {user.displayName}</p>
			{user.photoURL && (
				<Image src={user.photoURL} alt={user.displayName} width='200px' height='200px' />
			)}
			<br />
			<button onClick={() => signOut()}>Logout</button> */}
			{users?.map((user) => (
				<p key={user.uid}>{`login : ${user.logged}`}</p>
			))}
		</div>
	)
}

Index.getLayout = function getLayout(page) {
	return <Layout>{page}</Layout>
}

export default Index
