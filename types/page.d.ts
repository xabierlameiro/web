import { NextPage } from 'next'
import { ComponentType, ReactElement } from 'react'

export type Page<P = {}> = NextPage<P> & {
	// You can disable whichever you don't need
	getLayout?: (page: ReactElement) => JSX.Element
	layout?: ComponentType
}
