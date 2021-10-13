import { useEffect, useState, useCallback } from 'react'
import Image from 'next/image'
import { CoffeeLoading } from 'react-loadingg'
import dynamic from 'next/dynamic'
import { Marker } from 'react-map-gl'
import { useGeoPosition } from '@/hooks/useGeoPosition'
import { LOADING, DENIED, AGREED, PENDING } from '@/constants/geolocation'
import 'mapbox-gl/dist/mapbox-gl.css'

const ReactMap = dynamic(() => import('react-map-gl'), {
	loading: () => <CoffeeLoading />,
	ssr: false,
})

const Map = ({ users }: { users: any }): JSX.Element => {
	const { handlePermission, mapPosition, changeMapPosition } = useGeoPosition()

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

	const Markers = useCallback(() => {
		return users?.map((user) => (
			<Marker
				className={`avatar avatar--${user.state}`}
				key={user.uid}
				latitude={user?.latitude}
				longitude={user?.longitude}
				offsetLeft={-20}
				offsetTop={-10}>
				<Image src={user.photoURL} alt={user.name} width='100%' height='100%' />
			</Marker>
		))
	}, [users])

	if (consent === LOADING) return <CoffeeLoading />

	if (consent === DENIED) return <h1>No hay permisos de ubicación</h1>

	if (consent === AGREED)
		return (
			<ReactMap
				{...mapPosition}
				onViewportChange={(viewport) => changeMapPosition(viewport)}
				mapStyle={process.env.mapbox_style}
				mapboxApiAccessToken={process.env.mapbox_key}>
				<Markers />
			</ReactMap>
		)

	if (consent === PENDING) return <button onClick={handlePermission}>TEST PROMPT</button>
}
export { Map, Map as default }
