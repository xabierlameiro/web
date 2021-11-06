import { useEffect, useState } from 'react'
import { CoffeeLoading } from 'react-loadingg'
import dynamic from 'next/dynamic'
import { useGeoPosition } from '@/hooks/useGeoPosition'
import 'mapbox-gl/dist/mapbox-gl.css'
import { updateUser } from '@/utils/db'
import firebase from 'firebase/app'
import {
	GeolocateControlStyled,
	FullscreenControlStyled,
	NavigationControlStyled,
	ScaleControlStyled,
} from './map.styled'
import Markers from '@/components/Marker'

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
				<Markers users={users} mapPosition={mapPosition} />
				<GeolocateControlStyled />
				<FullscreenControlStyled />
				<NavigationControlStyled />
				<ScaleControlStyled />
			</ReactMap>
		)

	if (consent === useGeoPosition.PENDING)
		return <button onClick={handlePermission}>TEST PROMPT</button>
}
export { Map, Map as default }
