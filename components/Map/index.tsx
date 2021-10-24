import { useEffect, useState, useCallback } from 'react'
import Image from 'next/image'
import { CoffeeLoading } from 'react-loadingg'
import dynamic from 'next/dynamic'
import { useGeoPosition } from '@/hooks/useGeoPosition'
import 'mapbox-gl/dist/mapbox-gl.css'
import { updateUser } from '@/utils/db'
import firebase from 'firebase/app'

import {
	Marker,
	GeolocateControl,
	FullscreenControl,
	NavigationControl,
	ScaleControl,
} from 'react-map-gl'

const geolocateStyle = {
	top: 0,
	left: 0,
	padding: '10px',
}

const fullscreenControlStyle = {
	top: 36,
	left: 0,
	padding: '10px',
}

const navStyle = {
	top: 72,
	left: 0,
	padding: '10px',
}

const scaleControlStyle = {
	bottom: 36,
	left: 0,
	padding: '10px',
}

const ReactMap = dynamic(() => import('react-map-gl'), {
	loading: () => <CoffeeLoading />,
	ssr: false,
})

const Map = ({ users }: { users: any }): JSX.Element => {
	const { handlePermission, mapPosition, changeMapPosition } = useGeoPosition()

	const [consent, setConsent] = useState(useGeoPosition.LOADING)

	useEffect(() => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				({ coords }) => {
					const { latitude, longitude } = coords
					changeMapPosition({ latitude, longitude })
					setConsent(useGeoPosition.AGREED)
					if (firebase.auth().currentUser) {
						updateUser(firebase.auth().currentUser.uid, { latitude, longitude })
					}
				},
				() => setConsent(useGeoPosition.DENIED),
				{
					enableHighAccuracy: true,
					timeout: 10000,
				}
			)
		}
	}, [changeMapPosition])

	const Markers = useCallback(() => {
		return users?.map((user) => (
			<Marker
				className={`avatar avatar--${user.state}`}
				key={user.uid}
				latitude={user?.latitude}
				longitude={user?.longitude}
				offsetLeft={-55}
				offsetTop={-55}>
				<Image src={user.photoURL} alt={user.name} width='100%' height='100%' />
			</Marker>
		))
	}, [users])

	if (consent === useGeoPosition.LOADING) return <CoffeeLoading />

	if (consent === useGeoPosition.DENIED) return <h1>No hay permisos de ubicación</h1>

	if (consent === useGeoPosition.AGREED)
		return (
			<ReactMap
				{...mapPosition}
				width='100%'
				height='100%'
				onViewportChange={(viewport) => changeMapPosition(viewport)}
				mapStyle={process.env.mapbox_style}
				mapboxApiAccessToken={process.env.mapbox_key}>
				<Markers />
				<GeolocateControl style={geolocateStyle} />
				<FullscreenControl style={fullscreenControlStyle} />
				<NavigationControl style={navStyle} />
				<ScaleControl style={scaleControlStyle} />
			</ReactMap>
		)

	if (consent === useGeoPosition.PENDING)
		return <button onClick={handlePermission}>TEST PROMPT</button>
}
export { Map, Map as default }
