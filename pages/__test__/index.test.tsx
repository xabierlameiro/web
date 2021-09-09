import { render } from '../../test-utils'
import Home from '../index'

test('renders a message', () => {
	const { container, getByText } = render(<Home />)
	expect(getByText('Hello, world!')).toBeInTheDocument()
	expect(container.firstChild).toMatchInlineSnapshot(`
      <h1>Hello, World!</h1>
    `)
})
