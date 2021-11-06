import { memo } from 'react'
import { CustomMarker } from './map.styled'
import Image from 'next/image'

const Markers = ({ users, mapPosition }) => {
	return users?.map((user) => (
		<CustomMarker
			zoom={mapPosition?.zoom}
			online={user.state}
			key={user.uid}
			latitude={user?.latitude}
			longitude={user?.longitude}
			offsetLeft={-((mapPosition?.zoom * 20) / 2)}
			offsetTop={-((mapPosition?.zoom * 20) / 2)}>
			<Image src={user.photoURL} alt={user.name} layout='fill' />
		</CustomMarker>
	))
}

export default memo(Markers)
