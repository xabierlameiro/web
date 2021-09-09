import { render } from '../../test-utils'
import Home from '../index'

test('renders a message', () => {
	const { getByText } = render(<Home />)
	expect(getByText('Hello, world!')).toBeInTheDocument()
})
