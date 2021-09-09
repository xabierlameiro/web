import type {NextPage} from 'next'
import React from 'react'

const Home: NextPage = (): JSX.Element => {
	const bla = () => (e: React.MouseEventHandler<HTMLButtonElement>) => {
		return e
	}
	return (
		<h1>
			Web personal wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww222222222222222222<button onClick={bla}></button>
		</h1>
	)
}

export default Home
