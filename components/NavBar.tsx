import Link from 'next/link'
import { signInWithGoogle, signInWithGitHub, signOut } from '@/utils/auth'
import { useAuthUser } from 'next-firebase-auth'

const NavBar = (): JSX.Element => {
	const user = useAuthUser()
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
				{!user.id && (
					<li>
						<button onClick={() => signInWithGoogle()}>Login</button>
					</li>
				)}
				{!user.id && (
					<li>
						<button onClick={() => signInWithGitHub()}>Login Github</button>
					</li>
				)}
				<li>
					<button onClick={() => signOut({ user })}>Logout</button>
				</li>
			</ul>
		</header>
	)
}
export default NavBar
