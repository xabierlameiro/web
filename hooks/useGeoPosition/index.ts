import create from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { LOADING, DENIED, AGREED, PENDING } from '@/constants/geolocation'
import type { useGeoLocationType, useMapStoreType } from './useGeoPosition.types'

const useMapStore = create<useMapStoreType>(
	persist(
		devtools((set) => ({
			consent: PENDING,
			mapPosition: {
				zoom: 18,
				width: '100%',
				height: '100%',
				latitude: 42.5825647,
				longitude: -8.5961088,
			},
			userPosition: { latitude: null, longitude: null },
			changeConsetStatus: (consent) =>
				set((state) => {
					state.consent = consent
				}),
			changeMapPosition: (mapPosition) =>
				set((state) => {
					state.mapPosition.latitude = mapPosition.latitude
					state.mapPosition.longitude = mapPosition.longitude
				}),
			changeUserPosition: (userPosition) =>
				set((state) => {
					state.userPosition.latitude = userPosition.latitude
					state.userPosition.longitude = userPosition.longitude
				}),
		})),
		{
			name: 'map-storage',
			getStorage: () => sessionStorage,
		}
	)
)

const useGeoPosition = (): useGeoLocationType => {
	const { changeConsetStatus, changeMapPosition, changeUserPosition } = useMapStore(
		(state) => state
	)

	const handlePermission = (): void => {
		if (navigator.geolocation) {
			changeConsetStatus(LOADING)
			navigator.geolocation.getCurrentPosition(
				({ coords }) => {
					const { latitude, longitude } = coords
					changeMapPosition({ latitude, longitude })
					changeUserPosition({ latitude, longitude })
					changeConsetStatus(AGREED)
				},
				() => changeConsetStatus(DENIED),
				{
					enableHighAccuracy: true,
					timeout: 10000,
				}
			)
		} else {
			changeConsetStatus('NOT_SUPPORTED')
		}
	}

	const { consent, mapPosition, userPosition } = useMapStore((state) => state)

	return { handlePermission, consent, mapPosition, changeMapPosition, userPosition }
}

export { useGeoPosition }
