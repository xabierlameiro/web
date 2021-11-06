import create from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import type { useGeoLocationType, useMapStoreType } from './useGeoPosition.types'
import { updateUser } from '@/utils/db'
import firebase from 'firebase/app'
import { LOADING, DENIED, AGREED, PENDING } from '@/constants/geolocation'

const useMapStore = create<useMapStoreType>(
	persist(
		devtools((set) => ({
			mapPosition: {
				zoom: 8,
				latitude: 42.5825647,
				longitude: -8.5961088,
				bearing: 0,
				pitch: 0,
			},
			userPosition: { latitude: null, longitude: null },
			changeMapPosition: (mapPosition) => {
				set((state) => {
					state.mapPosition.latitude = mapPosition.latitude
					state.mapPosition.longitude = mapPosition.longitude
					state.mapPosition.zoom = mapPosition.zoom
				})
			},
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
	const { changeMapPosition, changeUserPosition } = useMapStore((state) => state)

	const handlePermission = (): void => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				({ coords }) => {
					const { latitude, longitude } = coords
					changeMapPosition({ latitude, longitude })
					changeUserPosition({ latitude, longitude })
					updateUser(firebase.auth().currentUser.uid, { latitude, longitude })
				},
				() => console.log(DENIED),
				{
					enableHighAccuracy: true,
					timeout: 10000,
				}
			)
		}
	}

	const { mapPosition, userPosition } = useMapStore((state) => state)

	return { handlePermission, mapPosition, changeMapPosition, userPosition }
}

useGeoPosition.LOADING = LOADING
useGeoPosition.DENIED = DENIED
useGeoPosition.AGREED = AGREED
useGeoPosition.PENDING = PENDING

export { useGeoPosition }
