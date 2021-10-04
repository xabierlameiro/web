import { CoffeeLoading } from 'react-loadingg'
import dynamic from 'next/dynamic'
import 'mapbox-gl/dist/mapbox-gl.css'
import d3 from 'd3-ease'
import { FlyToInterpolator, WebMercatorViewport, Marker } from 'react-map-gl'
import { useGeoPosition } from '@/hooks/useGeoPosition'
import { DENIED, AGREED, PENDING } from '@/constants/geolocation'

const ReactMap = dynamic(() => import('react-map-gl'), { loading: () => <CoffeeLoading /> })

const Map = (): JSX.Element => {
	const { handlePermission, consent, mapPosition, changeMapPosition, userPosition } =
		useGeoPosition()

	const goToSF = () => {
		const { longitude, latitude, zoom } = new WebMercatorViewport(mapPosition).fitBounds(
			[
				[-122.4, 37.7],
				[-122.5, 37.8],
			],
			{
				padding: 20,
				offset: [0, -100],
			}
		)
		changeMapPosition({
			...mapPosition,
			longitude,
			latitude,
			zoom,
			transitionDuration: 5000,
			transitionInterpolator: new FlyToInterpolator(),
			transitionEasing: d3?.easeCubic,
		})
	}
	const goToNYC = () => {
		changeMapPosition({
			...mapPosition,
			longitude: -74.1,
			latitude: 40.7,
			zoom: 14,
			transitionDuration: 7000,
			transitionInterpolator: new FlyToInterpolator(),
			transitionEasing: d3?.easeCubic,
		})
	}

	if (consent === AGREED)
		return (
			<>
				<button onClick={goToNYC}>New York City</button>
				<button onClick={goToSF}>goToSF</button>
				<ReactMap
					{...mapPosition}
					width='100%'
					height='80vh'
					zoom={18}
					mapStyle='mapbox://styles/xlameiro/cktkh1izv83wa17p9p48odxgg'
					onViewportChange={(viewport) => changeMapPosition(viewport)}
					mapboxApiAccessToken={process.env.mapbox_key}>
					<Marker
						latitude={userPosition?.latitude}
						longitude={userPosition?.longitude}
						offsetLeft={-20}
						offsetTop={-10}>
						<div>You are here</div>
					</Marker>
				</ReactMap>
			</>
		)

	if (consent === DENIED) return <h1>No hay permisos de ubicación</h1>

	if (consent === PENDING) return <button onClick={handlePermission}>TEST PROMPT</button>
}
export { Map, Map as default }
