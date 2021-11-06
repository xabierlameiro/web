import { Marker } from 'react-map-gl'
import styled from 'styled-components'

type CustomMarkerProps = {
	zoom: number
	online: 'online' | 'offline'
}

export const CustomMarker = styled(Marker)`
	width: ${(props: CustomMarkerProps) => props.zoom * 20}px;
	height: ${(props) => props.zoom * 20}px;
	border-radius: 100px;
	border: ${(props) => props.zoom * 0.5}px solid
		${(props) => (props.online === 'online' ? 'green' : 'grey')};
	max-width: 100px;
	max-height: 100px;
	z-index: 1;

	img {
		border-radius: 100px;
	}
`
