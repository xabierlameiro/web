import { render, screen } from '../../test-utils'
import Home from '../index'

test('renders a message', () => {
	const { debug, container } = render(<Home />)
	// debug()
	screen.getByText('Web personal')
})
