import Link from 'next/link'
import { signOut } from '@/utils/auth'
import { useAuthUser } from 'next-firebase-auth'

const NavBar = (): JSX.Element => {
	const AuthUser = useAuthUser()
	return (
		<header>
			<ul>
				<li>
					<Link href='/'>Home</Link>
				</li>
				<li>
					<Link href='/map'>Map</Link>
				</li>
				{AuthUser && (
					<li>
						<a onClick={() => signOut({ AuthUser })}>Logout</a>
					</li>
				)}
			</ul>
		</header>
	)
}
export default NavBar
