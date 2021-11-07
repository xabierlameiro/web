import { Marker } from 'react-map-gl'
import styled from 'styled-components'
import {
	ONLINE,
	OFFLINE,
	MARKER_SIZE,
	BORDER_SIZE,
	ONLINE_COLOR,
	OFFLINE_COLOR,
} from '@/constants/marker'

type CustomMarkerProps = {
	zoom: number
	online: typeof ONLINE | typeof OFFLINE
}

export const CustomMarker = styled(Marker)`
	width: ${(props: CustomMarkerProps) => props.zoom * MARKER_SIZE}px;
	height: ${(props) => props.zoom * MARKER_SIZE}px;

	max-width: 100px;
	max-height: 100px;
	z-index: 1;

	img {
		border-radius: 100px;
		border: 3px solid ${(props) => (props.online === ONLINE ? ONLINE_COLOR : OFFLINE_COLOR)} !important;
	}
`
