import { useState } from 'react'
import { CoffeeLoading } from 'react-loadingg'
import dynamic from 'next/dynamic'
import 'mapbox-gl/dist/mapbox-gl.css'

const ReactMap = dynamic(() => import('react-map-gl'), { loading: () => <CoffeeLoading /> })

const Map = (): JSX.Element => {
	const [viewport, setViewport] = useState({
		latitude: 42.5825647,
		longitude: -8.5961088,
		zoom: 1,
	})

	return (
		<ReactMap
			{...viewport}
			width='100vw'
			height='100vh'
			mapStyle='mapbox://styles/xlameiro/cktkh1izv83wa17p9p48odxgg'
			onViewportChange={(viewport) => setViewport(viewport)}
			mapboxApiAccessToken={process.env.mapbox_key}
		/>
	)
}
export default Map
