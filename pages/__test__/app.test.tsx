import { render, screen } from 'test-utils'
import App from '../_app'
import Home from '../'

test('renders a message', () => {
	render(<App Component={Home} pageProps={undefined} router={undefined} />)
	screen.getByText('HOLA')
})
