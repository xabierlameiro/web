const os = require('os')

/** @type {import('next').NextConfig} */

module.exports = {
	env: {
		mapbox_key:
			'pk.eyJ1IjoieGxhbWVpcm8iLCJhIjoiY2t0a2Z3dWZsMWw4azJ3am9qcW82ZnI1cSJ9.jkgRO3RjPQ-yxw-hmhay4w',
		mapbox_style: 'mapbox://styles/xlameiro/cktkh1izv83wa17p9p48odxgg',
	},
	webpack: null,
	webpackDevMiddleware: null,
	eslint: {
		ignoreDuringBuilds: true,
	},
	typescript: {
		ignoreBuildErrors: true,
	},
	distDir: '.next',
	cleanDistDir: true,
	assetPrefix: '',
	configOrigin: 'default',
	useFileSystemPublicRoutes: true,
	generateBuildId: () => null,
	generateEtags: true,
	pageExtensions: ['tsx', 'ts', 'jsx', 'js'],
	target: 'server',
	poweredByHeader: true,
	compress: true,
	analyticsId: process.env.VERCEL_ANALYTICS_ID || '',
	images: {
		deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
		imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
		path: '/_next/image',
		loader: 'default',
		domains: ['lh3.googleusercontent.com'],
		disableStaticImages: false,
		minimumCacheTTL: 60,
	},
	devIndicators: {
		buildActivity: true,
	},
	onDemandEntries: {
		maxInactiveAge: 60 * 1000,
		pagesBufferLength: 2,
	},
	amp: {
		canonicalBase: '',
	},
	basePath: '',
	sassOptions: {},
	trailingSlash: false,
	i18n: {
		locales: ['es'],
		defaultLocale: 'es',
		domains: [],
	},
	productionBrowserSourceMaps: false,
	optimizeFonts: true,
	webpack5: true,
	excludeDefaultMomentLocales: true,
	serverRuntimeConfig: {},
	publicRuntimeConfig: {},
	reactStrictMode: false,
	httpAgentOptions: {
		keepAlive: true,
	},
	experimental: {
		swcLoader: false,
		swcMinify: false,
		cpus: Math.max(
			1,
			(Number(process.env.CIRCLE_NODE_TOTAL) || (os.cpus() || { length: 1 }).length) - 1
		),
		sharedPool: false,
		plugins: false,
		profiling: false,
		isrFlushToDisk: true,
		workerThreads: false,
		pageEnv: false,
		optimizeImages: false,
		optimizeCss: false,
		scrollRestoration: false,
		stats: false,
		externalDir: false,
		reactRoot: Number(process.env.NEXT_PRIVATE_REACT_ROOT) > 0,
		disableOptimizedLoading: false,
		gzipSize: true,
		craCompat: false,
		esmExternals: false,
		staticPageGenerationTimeout: 60,
		// default to 50MB limit
		isrMemoryCacheSize: 50 * 1024 * 1024,
		nftTracing: false,
		concurrentFeatures: false,
	},
	future: {
		strictPostcssConfiguration: false,
	},

	async headers() {
		return [
			{
				source: '/api',
				headers: [
					{
						key: 'Set-Cookie',
						value: 'cross-site-cookie=whatever; SameSite=None; Secure',
					},
					{
						key: 'Hola',
						value: 'Mundo',
					},
				],
			},
		]
	},
}
