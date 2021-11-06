import { GeolocateControl, FullscreenControl, NavigationControl, ScaleControl } from 'react-map-gl'
import styled from 'styled-components'

export const GeolocateControlStyled = styled(GeolocateControl)`
	top: 0;
	left: 0;
	padding: 10px;
`

export const FullscreenControlStyled = styled(FullscreenControl)`
	top: 36px;
	left: 0;
	padding: 10px;
`

export const NavigationControlStyled = styled(NavigationControl)`
	top: 72px;
	left: 0;
	padding: 10px;
`

export const ScaleControlStyled = styled(ScaleControl)`
	top: 36px;
	left: 0;
	padding: 10px;
`
