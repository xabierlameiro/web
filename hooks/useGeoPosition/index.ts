import create from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { DENIED, AGREED, PENDING } from '@/constants/geolocation'
import type { useGeoLocationType, useMapStoreType } from './useGeoPosition.types'

const useMapStore = create<useMapStoreType>(
	persist(
		devtools((set) => ({
			consent: PENDING,
			mapPosition: { width: 100, height: 100, latitude: 42.5825647, longitude: -8.5961088 },
			userPosition: { width: 100, height: 100 },
			changeConsetStatus: (consent) =>
				set((state) => ({
					...state,
					consent,
				})),
			changeMapPosition: ({ latitude, longitude }) =>
				set((state) => ({
					...state,
					mapPosition: {
						...state.mapPosition,
						latitude,
						longitude,
					},
				})),
			changeUserPosition: ({ latitude, longitude }) =>
				set((state) => ({
					...state,
					userPosition: {
						...state.userPosition,
						latitude,
						longitude,
					},
				})),
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
	}

	const { consent, mapPosition, userPosition } = useMapStore((state) => state)

	return { handlePermission, consent, mapPosition, changeMapPosition, userPosition }
}

export { useGeoPosition }
