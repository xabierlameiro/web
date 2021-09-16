import { unsetAuthCookies } from 'next-firebase-auth'
import initAuth from '../../configs/firebase/next-firebase-auth'
import type { NextApiRequest, NextApiResponse } from 'next'

initAuth()

const handler = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
	try {
		await unsetAuthCookies(req, res)
	} catch (error) {
		return res.status(500).json({ error })
	}
	return res.status(200).json({ success: true })
}

export default handler
