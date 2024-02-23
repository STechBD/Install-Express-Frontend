import { JSX } from 'react'
import { Metadata } from 'next'
import Script from 'next/script'
import Hero from '@/app/server-info/hero'


const servers = [
	{
		id: 1,
		name: 'Server 1',
		location: 'Dallas, Texas',
		zip: 75270,
		country: 'United States',
		host: 'srv1.whitednszone.com',
		ip: '166.0.175.226',
		isp: 'Psychz Networks',
		organization: 'IPXO',
		active: true,
		up: true,
	},
	{
		id: 2,
		name: 'Server 2',
		location: 'Dhaka, Dhaka Division',
		zip: 1219,
		country: 'Bangladesh',
		host: 'srv4.whitednszone.com',
		ip: '103.174.153.125',
		isp: 'ColoCone Admin',
		organization: 'ColoCone Limited',
		active: true,
		up: true,
	},
	{
		id: 3,
		name: 'Server 3',
		location: 'Singapore City, Singapore',
		zip: 178958,
		country: 'Singapore',
		host: 'srv2.whitednszone.com',
		ip: '131.153.48.206',
		isp: 'Secured Servers LLC',
		organization: 'PingPipe Internet Corporation',
		active: true,
		up: true,
	},
	{
		id: 4,
		name: 'Server 4',
		location: 'Phoenix, Arizona',
		zip: 85034,
		country: 'United States',
		host: 'srv5.whitednszone.com',
		ip: '184.164.94.74',
		isp: 'Input Output Flood LLC',
		organization: 'Input Output Flood LLC',
		active: true,
		up: true,
	},
	{
		id: 5,
		name: 'Server 5',
		location: 'Dhaka, Dhaka Division',
		zip: 1230,
		country: 'Bangladesh',
		host: 'srv6.whitednszone.com',
		ip: '103.174.152.60',
		isp: 'ColoCone Admin',
		organization: 'ColoCone Limited',
		active: true,
		up: true,
	},
	{
		id: 6,
		name: 'Server 6',
		location: 'Dhaka, Dhaka Division',
		zip: 1230,
		country: 'Bangladesh',
		host: 'srv7.whitednszone.com',
		ip: '103.174.152.34',
		isp: 'ColoCone Admin',
		organization: 'ColoCone Limited',
		active: true,
		up: true,
	},
]


/**
 * The metadata for the Server Information page.
 *
 * @type { Metadata }
 * @since 3.0.0
 */
export const metadata: Metadata = {
	title: 'Server Information',
	description: 'Here you can find information about our servers and their status.',
}


async function info(): Promise<any> {
	const url: string = process.env.WHMCS_API_URL || 'https://cpanel.stechbd.net/includes/api.php'
	// const url: string = 'https://www.stechbd.net/post.php'
	const identifier: string = process.env.WHMCS_API_IDENTIFIER || 'stechbd'
	const secret: string = process.env.WHMCS_API_SECRET || 'stechbd'

	const formData: FormData = new FormData()

	formData.append('identifier', identifier)
	formData.append('secret', secret)
	formData.append('action', 'GetServers')
	formData.append('serviceId', '1')
	formData.append('fetchStatus', 'false')
	formData.append('responsetype', 'json')

	return await fetch(url, {
		method: 'POST',
		body: formData,
	})
}


/**
 * The Server Information page component.
 *
 * @returns { JSX.Element } The Server Information page component.
 * @since 3.0.0
 */
export default async function Page(): Promise<JSX.Element> {
	const data = await info()

	if (data.ok) {
		const json = await data.json()

		console.log('Data:')
		console.log(json)
		console.log('Status:')
		console.log(json.servers[0].status)

		// modify the up status of the server 1
		servers[0].up = json.servers[0].active
	} else {
		console.error('Failed to fetch server information.')
		console.error('Error:', data.statusText)

		servers[0].up = false
	}

	return (
		<>
			<Hero/>
			<div className="bg-white">
				<div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:py-20 lg:px-8">
					<div className="lg:grid lg:grid-cols-3 lg:gap-8">
						<div>
							<h2 className="text-2xl font-extrabold tracking-tight text-primary sm:text-3xl">
								Server Location
							</h2>
							<div className="mt-3">
								{
									servers.map((server) => (
										<div key={ server.id }>
											<p className="mt-1 text-lg text-gray-900">
												{ server.id }. { server.location }, { server.country }
											</p>
										</div>
									))
								}
							</div>
						</div>
						<div className="mt-12 lg:mt-0 lg:col-span-2">
							<div className="mt-3">
								<h2 className="text-2xl font-extrabold tracking-tight text-primary sm:text-3xl">
									Servers of S Technologies
								</h2>
								<p className="text-lg text-gray-900">
									Here you can find information about our servers and their status.
								</p>
							</div>
							<div className="mt-12">
								{
									servers.map((server) => (
										<div key={ server.id }>
											<div className="mb-8 p-8 rounded-lg shadow-lg">
												<h3 className="text-lg text-primary">
													<strong>
														{ server.name }
													</strong>
												</h3>
												<p className="mt-1 text-lg text-gray-900">
													<strong>Location:</strong> { server.location }
												</p>
												<p className="mt-1 text-lg text-gray-900">
													<strong>Country:</strong> { server.country }
												</p>
												<p className="mt-1 text-lg text-gray-900">
													<strong>Status:</strong> { server.up ?
													<span className="text-green-700">Up</span> :
													<span className="text-red-700">Down</span> }
												</p>
											</div>
										</div>
									))
								}
							</div>
						</div>
					</div>
				</div>
			</div>
			<Script id="schema" type="application/ld+json">
				{ `
					{
					  "@context": "https://schema.org",
					  "@type": "Organization",
					  "url": "https://www.stechbd.net",
					  "name": "S Technologies",
					  "alternateName": "এস টেকনোলজি",
					  "alternateName": "STechBD",
					  "alternateName": "STechBD.Net",
					  "logo": "https://www.stechbd.net/image/S-Technologies-Icon-Light.svg",
					  "description": "S Technologies (STechBD.Net) is a leading technology company in Bangladesh. It was founded in 2013. It provides services like domain registration, web hosting, web servers, software development, software as a service (SasS), design solutions, etc. S Technologies has been working in research of new technologies and developing new products for the people.",
					  "contactPoint": {
						"@type": "ContactPoint",
						"telephone": "+8801935446721",
						"contactType": "Customer service"
					  },
					  "address": {
                        "@type": "PostalAddress",
                        "addressLocality": "Dhaka",
                        "addressCountry": "Bangladesh"				
					},
					  "sameAs": [
						"https://www.facebook.com/STechBD.Net",
						"https://www.linkedin.com/company/STechBD",
						"https://www.instagram.com/STechBD",
						"https://www.twitter.com/STechBD_Net"
					  ]
					},
					{
					  "@context": "https://schema.org",
					  "@type": "WebSite",
					  "url": "https://www.stechbd.net",
					  "potentialAction": {
						"@type": "SearchAction",
						"target": "https://www.stechbd.net/search?q={search_term_string}",
						"query-input": "required name=search_term_string"
					  }
					},
					{
					  "@context": "https://schema.org",
					  "@type": "WebPage",
					  "url": "https://www.stechbd.net",
					  "name": "S Technologies",
					  "isPartOf": {
						"@type": "WebSite",
						"url": "https://www.stechbd.net"
					  },
					  "inLanguage": "en-US",
					  "about": "S Technologies (STechBD.Net) is a leading technology company in Bangladesh. It was founded in 2013. It provides services like domain registration, web hosting, web servers, software development, software as a service (SasS), design solutions, etc. S Technologies has been working in research of new technologies and developing new products for the people.",
					  "datePublished": "2013-01-01",
					  "dateModified": "2021-09-01"
					},
					{
					  "@context": "https://schema.org",
					  "@type": "BreadcrumbList",
					  "itemListElement": [
						{
						  "@type": "ListItem",
						  "position": 1,
						  "name": "Home",
						  "item": "https://www.stechbd.net"
						},
						{
						  "@type": "ListItem",
						  "position": 2,
						  "name": "Server",
						  "item": "https://www.stechbd.net/server"
						},
						{
						  "@type": "ListItem",
						  "position": 3,
						  "name": "Server Information",
						  "item": "https://www.stechbd.net/server-information"
						}
					  ]
					}
				` }
			</Script>
		</>
	)
}