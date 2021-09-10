import { render, screen, fireEvent } from 'test-utils'
import Home from '../index'

describe('Testing Home page', () => {
	it('The button is renderer', async () => {
		render(<Home />)
		screen.getByText('HOLA')
		const button = screen.getByRole('button')
		expect(button).toBeInTheDocument()
		fireEvent.click(button)
		screen.getByText('MUNDO')
		screen.debug()
	})
})
