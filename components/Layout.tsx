import Navbar from './NavBar'
import Footer from './Footer'

const Layout = ({ children }: { children: React.ReactNode }): JSX.Element => {
	return (
		<>
			<Navbar />
			<main>{children}</main>
			<Footer />
		</>
	)
}
export default Layout
