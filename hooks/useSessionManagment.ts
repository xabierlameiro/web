import { useAuthUser } from 'next-firebase-auth'
import { logoutUser } from '@/utils/db'

const useSessionManagment = (): void => {
	const user = useAuthUser()

	if (process.browser) {
		window.onbeforeunload = () => {
			logoutUser({ user })
		}
	}
}

export { useSessionManagment }
