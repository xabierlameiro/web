import ReactMapGL from 'react-map-gl'
import { useState } from 'react'
import 'mapbox-gl/dist/mapbox-gl.css'

const Map = (): JSX.Element => {
	const [viewport, setViewport] = useState({
		latitude: 42.5825647,
		longitude: -8.5961088,
		zoom: 1,
	})

	return (
		<ReactMapGL
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
