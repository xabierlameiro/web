import Navbar from './NavBar'
import Footer from './Footer'

const Layout = ({ children }: { children: React.ReactNode }): JSX.Element => {
	return (
		<>
			<Navbar />
			<div className='main'>{children}</div>
			<Footer />
		</>
	)
}
export default Layout
