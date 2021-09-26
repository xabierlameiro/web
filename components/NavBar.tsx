import Link from 'next/link'
import { signInWithGoogle, signInWithGitHub, signOut } from '@/utils/auth'
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
			</ul>
			<ul>
				{!user ? (
					<>
						<li>
							<button onClick={() => signInWithGoogle()}>Login</button>
						</li>

						<li>
							<button onClick={() => signInWithGitHub()}>Login Github</button>
						</li>
					</>
				) : (
					<li>
						<button onClick={() => signOut({ user })}>Logout</button>
					</li>
				)}
			</ul>
		</header>
	)
}
export default NavBar
