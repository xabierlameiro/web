import { memo } from 'react'
import { CustomMarker } from './index.styled'
import Image from 'next/image'
import { MARKER_SIZE } from '@/constants/marker'

const Markers = ({ users, zoom }) => {
	console.log('users', users)
	console.log('zoom', zoom)
	return users?.map((user) => (
		<CustomMarker
			zoom={zoom}
			online={user.state}
			key={user.uid}
			latitude={user?.latitude}
			longitude={user?.longitude}
			offsetLeft={-((zoom * MARKER_SIZE) / 2)}
			offsetTop={-((zoom * MARKER_SIZE) / 2)}>
			<Image src={user.photoURL} alt={user.name} width='100%' height='100%' />
		</CustomMarker>
	))
}

export default memo(Markers)
