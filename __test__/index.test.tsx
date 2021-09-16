import { render, screen, fireEvent } from '../jest.setup'
import Home from '../pages'

describe('Testing Home page', () => {
	it('The button is renderer', async () => {
		render(<Home />)
		const button = screen.getByRole('button')
		expect(button).toBeInTheDocument()
		fireEvent.click(button)
	})
})
