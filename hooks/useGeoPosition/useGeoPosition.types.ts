import { TransitionInterpolator } from 'react-map-gl'

type InteractiveState = Partial<{
	startPanLngLat: Array<number>
	startZoomLngLat: Array<number>
	startBearing: number
	startPitch: number
	startZoom: number
}>

type WebMercatorViewportOptions = {
	width?: number | string
	height?: number | string
	latitude?: number
	longitude?: number
	zoom?: number
	bearing?: number
	pitch?: number
	altitude?: number
	maxZoom?: number
	minZoom?: number
	maxPitch?: number
	minPitch?: number
	transitionDuration?: number
	transitionEasing?: (t: number) => number
	transitionInterpolator?: TransitionInterpolator
	transitionInterruption?: number
}

export type MapStateProps = WebMercatorViewportOptions & InteractiveState

export type useGeoLocationType = {
	handlePermission: () => void
	mapPosition: WebMercatorViewportOptions
	changeMapPosition: (location: WebMercatorViewportOptions) => void
	userPosition: WebMercatorViewportOptions | undefined
}

type coordsType = {
	latitude?: number
	longitude?: number
	zoom?: number
}
export type useMapStoreType = {
	mapPosition: WebMercatorViewportOptions
	userPosition: WebMercatorViewportOptions
	changeMapPosition: (mapPosition: coordsType) => void
	changeUserPosition: (userPosition: coordsType) => void
}
