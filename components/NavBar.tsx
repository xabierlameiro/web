import Link from 'next/link'
import { signOut } from '@/utils/auth'
import firebase from 'firebase/app'

const NavBar = (): JSX.Element => {
	const user = firebase.auth().currentUser
	return (
		<header>
			<ul>
				<li>
					<Link href='/'>Home</Link>
				</li>
				<li>
					<Link href='/map'>Map</Link>
				</li>
				{user && (
					<li>
						<a onClick={() => signOut({ user })}>Logout</a>
					</li>
				)}
			</ul>
		</header>
	)
}
export default NavBar
