import type { NextPage } from 'next'
import { useState } from 'react'

const Home: NextPage = (): JSX.Element => {
	const [message, setMessage] = useState('HOLA')
	const bla = () => setMessage('MUNDO')
	return (
		<h1>
			{message}
			<button onClick={bla}>Button</button>
		</h1>
	)
}

export default Home
