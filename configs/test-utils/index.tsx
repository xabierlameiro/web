// eslint-disable-next-line @typescript-eslint/ban-ts-comment
import { FC, ReactElement } from 'react'
import { render, RenderOptions, RenderResult } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

const AllTheProviders: FC = ({ children }): JSX.Element => {
	return <>{children}</>
}

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>): RenderResult =>
	render(ui, { wrapper: AllTheProviders, ...options })

export * from '@testing-library/react'
export { customRender as render }
