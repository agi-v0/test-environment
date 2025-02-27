const { createClient } = require('next-sanity')
const groq = require('groq')
const createNextIntlPlugin = require('next-intl/plugin');
const withNextIntl = createNextIntlPlugin();

const client = createClient({
	projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
	dataset: 'random-testing',
	apiVersion: '2024-05-01',
	useCdn: true,
})

/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'cdn.sanity.io',
			},
		],
	},

	async redirects() {
		return await client.fetch(groq`*[_type == 'redirect']{
			source,
			destination,
			permanent
		}`)
	},

	// logging: {
	// 	fetches: {
	// 		fullUrl: true,
	// 	},
	// },
}

/** @type {import('next').NextConfig} */
 
module.exports = withNextIntl(nextConfig);

// module.exports = nextConfig
