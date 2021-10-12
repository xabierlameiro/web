import { useEffect, useState } from 'react'
import { CoffeeLoading } from 'react-loadingg'
import dynamic from 'next/dynamic'
import 'mapbox-gl/dist/mapbox-gl.css'
import { Marker } from 'react-map-gl'
import { useGeoPosition } from '@/hooks/useGeoPosition'
import { LOADING, DENIED, AGREED, PENDING } from '@/constants/geolocation'

const ReactMap = dynamic(() => import('react-map-gl'), {
	loading: () => <CoffeeLoading />,
	ssr: false,
})

const Map = (): JSX.Element => {
	const { handlePermission, mapPosition, changeMapPosition, userPosition } = useGeoPosition()

	const [consent, setConsent] = useState(LOADING)

	const bla = (state) => {
		if (state === 'granted') {
			setConsent(AGREED)
		} else if (state === 'prompt') {
			setConsent(PENDING)
		} else if (state === 'denied') {
			setConsent(DENIED)
		}
	}
	useEffect(() => {
		navigator.permissions.query({ name: 'geolocation' }).then(function (result) {
			bla(result.state)
			result.onchange = () => bla(result.state)
		})
	})
	if (consent === LOADING) return <CoffeeLoading />

	if (consent === DENIED) return <h1>No hay permisos de ubicación</h1>

	if (consent === AGREED)
		return (
			<ReactMap
				{...mapPosition}
				onViewportChange={(viewport) => changeMapPosition(viewport)}
				mapStyle={process.env.mapbox_style}
				mapboxApiAccessToken={process.env.mapbox_key}>
				<Marker
					latitude={userPosition?.latitude}
					longitude={userPosition?.longitude}
					offsetLeft={-20}
					offsetTop={-10}>
					<div>You are here</div>
				</Marker>
			</ReactMap>
		)

	if (consent === PENDING) return <button onClick={handlePermission}>TEST PROMPT</button>
}
export { Map, Map as default }
