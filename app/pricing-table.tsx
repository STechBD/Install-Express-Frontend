'use client'

import { JSX, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link';

/**
 * Pricing table for the homepage.
 *
 * @returns { JSX.Element } The pricing table.
 * @since 3.0.0
 */
export default function PricingTable(): JSX.Element {
	const [ sharedHostingPrice, setSharedHostingPrice ] = useState<number>(1200)
	const [ resellerHostingPrice, setResellerHostingPrice ] = useState<number>(7000)
	const [ unmanagedVPSPrice, setUnmanagedVPSPrice ] = useState<number>(5000)
	const [ serverPrice, setServerPrice ] = useState<number>(1200)
	const [ currency, setCurrency ] = useState<string>('bdt')

	const data = [
		{
			title: 'Shared Hosting',
			featured: true,
			price: sharedHostingPrice,
			period: 0,
			description: 'Ideal for low volume websites',
			features: [
				<><strong>3GB NVMe SSD</strong> Storage</>,
				<><strong>60GB</strong> Bandwidth</>,
				<><strong>1</strong> Domain</>,
				<><strong>Unlimited</strong> Subdomain, Addon Domain, and Parked Domain</>,
				<><strong>Unlimited</strong> Email Account, FTP, Database</>,
				<><strong>Free</strong> SSL Certificate</>,
			],
			button: 'More Plans',
			link: '/shared-hosting',
		},
		{
			title: 'Reseller Hosting',
			price: resellerHostingPrice,
			period: 0,
			description: 'Ideal for starting hosting service business',
			features: [
				<><strong>10GB NVMe SSD</strong> Storage</>,
				<><strong>100GB</strong> Bandwidth</>,
				<><strong>5</strong> cPanel Account</>,
				<><strong>Unlimited</strong> Domain</>,
				<><strong>Unlimited</strong> Subdomain, Addon Domain, and Parked Domain</>,
				<><strong>Unlimited</strong> Email Account, FTP, Database</>,
				<><strong>Unlimited Free</strong> SSL Certificate</>,
				<><strong>cPanel and WHM</strong> Control Panel</>,
			],
			button: 'More Plans',
			link: '/reseller-hosting',
		},
		{
			title: 'Unmanaged VPS',
			price: unmanagedVPSPrice,
			period: 1,
			description: 'Ideal for high traffic websites',
			features: [
				<><strong>50GB NVMe SSD</strong> Storage</>,
				<><strong>1TB</strong> Bandwidth</>,
				<><strong>2GB</strong> RAM</>,
				<><strong>1</strong> vCPU</>,
				<><strong>1</strong> IPv4 Address</>,
				<><strong>Unlimited</strong> IPv6 Address</>,
				<><strong>Unlimited</strong> OS</>,
				<><strong>Full Root Access</strong> Control Panel</>,
			],
			button: 'More Plans',
			link: '/unmanaged-vps',
		},
		{
			title: 'Dedicated Server',
			price: serverPrice,
			period: 1,
			description: 'Ideal for high traffic websites',
			features: [
				<><strong>500GB NVMe SSD</strong> Storage</>,
				<><strong>10TB</strong> Bandwidth</>,
				<><strong>8GB</strong> RAM</>,
				<><strong>4</strong> vCPU</>,
				<><strong>1</strong> IPv4 Address</>,
				<><strong>Unlimited</strong> IPv6 Address</>,
				<><strong>Unlimited</strong> OS</>,
				<><strong>Full Root Access</strong> Control Panel</>,
			],
			button: 'More Plans',
			link: '/dedicated-server',
		},
	]

	return (
		<>
			<div className="flex justify-center items-center my-10">
				<button
					className={ `px-4 py-2 rounded-l-md focus:outline-none ${ currency === 'bdt' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-indigo-600' }` }
					onClick={ (): void => {
						setCurrency('bdt')
						setSharedHostingPrice(1200)
						setResellerHostingPrice(7000)
						setUnmanagedVPSPrice(1400)
						setServerPrice(1200)
					} }
				>
					BDT (৳)
				</button>
				<button
					className={ `px-4 py-2 rounded-r-md focus:outline-none ${ currency === 'usd' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-indigo-600' }` }
					onClick={ (): void => {
						setCurrency('usd')
						setSharedHostingPrice(12)
						setResellerHostingPrice(70)
						setUnmanagedVPSPrice(14)
						setServerPrice(12)
					} }
				>
					USD ($)
				</button>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
				{
					data.map((item: any, index: number): JSX.Element => {
						return (
							<div
								key={ index }
								className="p-8 bg-white rounded-lg"
							>
								<div className="text-center">
									<h2 className="text-3xl font-semibold text-gray-900">
										{ item.title }
									</h2>
									<p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
										{ item.description }
									</p>
								</div>
								<div className="mt-8">
									<div className="flex items-center justify-center">
										<span className="text-5xl font-semibold text-gray-900">
											{ currency === 'bdt' ? '৳' : '$' }
										</span>
										<span className="text-5xl font-semibold text-gray-900">
											{ item.price }
										</span>
										<span className="text-xl font-medium text-gray-500">
											&nbsp;/{ item.period === 0 ? 'year' : 'month' }
										</span>
									</div>
									<p className="mt-4 text-sm text-gray-500">
										Billed { item.period === 0 ? 'annually' : 'monthly' }
									</p>
								</div>
								<div className="mt-8">
									<ul className="space-y-2">
										{
											item.features.map((feature: any, index: number): JSX.Element => {
												return (
													<li key={ index } className="flex items-center">
														<svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20"
														     xmlns="http://www.w3.org/2000/svg">
															<path fillRule="evenodd" clipRule="evenodd"
															      d="M10 18a8 8 0 100-16 8 8 0 000 16zm5-10a1 1 0 00-1.707-.707L10 11.586l-2.293-2.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l5-5a1 1 0 00.293-.707z"/>
														</svg>
														<span className="ml-2 text-gray-700">
															{ feature }
														</span>
													</li>
												)
											})
										}
									</ul>
								</div>
								<div className="mt-8">
									<Link href={ item.link }
									      className="block w-full px-4 py-3 text-center font-medium text-white bg-purple-600 rounded-md hover:bg-primary-600">
										{ item.button }
									</Link>
								</div>
							</div>
						)
					})
				}
				<div
					className="p-8 bg-white dark:bg-gray-800 dark:border dark:border-gray-700 dark:hover:border-gray-600 dark:hover:shadow-lg dark:shadow-sm rounded-lg">
					<div className="text-center">
						<h2 className="text-3xl font-semibold text-gray-900 dark:text-gray-100">
							Shared Hosting
						</h2>
						<p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
							Ideal for low volume websites
						</p>
					</div>
					<div className="mt-8">
						<div className="flex items-center justify-center">
							<span className="text-5xl font-semibold text-gray-900 dark:text-gray-100">
								{ currency === 'bdt' ? '৳' : '$' }
							</span>
							<span className="text-5xl font-semibold text-gray-900 dark:text-gray-100">
								{ sharedHostingPrice }
							</span>
							<span className="text-xl font-medium text-gray-500 dark:text-gray-400">
								&nbsp;/ year
							</span>
						</div>
						<p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
							Billed annually
						</p>
					</div>
					<div className="mt-8">
						<ul className="space-y-2">
							<li className="flex items-center">
								<svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20"
								     xmlns="http://www.w3.org/2000/svg">
									<path fillRule="evenodd" clipRule="evenodd"
									      d="M10 18a8 8 0 100-16 8 8 0 000 16zm5-10a1 1 0 00-1.707-.707L10 11.586l-2.293-2.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l5-5a1 1 0 00.293-.707z"/>
								</svg>
								<span className="ml-2 text-gray-700 dark:text-gray-300">Unlimited projects</span>
							</li>
							<li className="flex items-center">
								<svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20"
								     xmlns="http://www.w3.org/2000/svg">
									<path fillRule="evenodd" clipRule="evenodd"
									      d="M10 18a8 8 0 100-16 8 8 0 000 16zm5-10a1 1 0 00-1.707-.707L10 11.586l-2.293-2.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l5-5a1 1 0 00.293-.707z"/>
								</svg>
								<span className="ml-2 text-gray-700 dark:text-gray-300">Unlimited users</span>
							</li>
							<li className="flex items-center">
								<svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20"
								     xmlns="http://www.w3.org/2000/svg">
									<path fillRule="evenodd" clipRule="evenodd"
									      d="M10 18a8 8 0 100-16 8 8 0 000 16zm5-10a1 1 0 00-1.707-.707L10 11.586l-2.293-2.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l5-5a1 1 0 00.293-.707z"/>
								</svg>
								<span className="ml-2 text-gray-700 dark:text-gray-300">24/7 support</span>
							</li>
							<li className="flex items-center">
								<Image src="/icon/tick.svg" className="w-4 h-4 text-green-500" alt="Tick" width={ 100 } height={ 100 }/>
								<span className="ml-2 text-gray-700 dark:text-gray-300">24/7 support</span>
							</li>
						</ul>
					</div>
					<div className="mt-8">
						<a href="#"
						   className="block w-full px-4 py-3 text-center font-medium text-white bg-primary-500 rounded-md hover:bg-primary-600">Start
							free trial
						</a>
					</div>
				</div>
				<div
					className="p-8 bg-white dark:bg-gray-800 dark:border dark:border-gray-700 dark:hover:border-gray-600 dark:hover:shadow-lg dark:shadow-sm rounded-lg">
					<div className="text-center">
						<h2 className="text-3xl font-semibold text-gray-900 dark:text-gray-100">Premium</h2>
						<p className="mt-2 text-lg text-gray-600 dark:text-gray-400">For large teams</p>
					</div>
					<div className="mt-8">
						<div className="flex items-center justify-center">
							<span className="text-5xl font-semibold text-gray-900 dark:text-gray-100">$</span>
							<span className="text-5xl font-semibold text-gray-900 dark:text-gray-100">49</span>
							<span className="text-xl font-medium text-gray-500 dark:text-gray-400">/mo</span>
						</div>
						<p className="mt-4 text-sm text-gray-500 dark:text-gray-400">Billed monthly</p>
					</div>
					<div className="mt-8">
						<ul className="space-y-2">
							<li className="flex items-center">
								<svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20"
								     xmlns="http://www.w3.org/2000/svg">
									<path fillRule="evenodd" clipRule="evenodd"
									      d="M10 18a8 8 0 100-16 8 8 0 000 16zm5-10a1 1 0 00-1.707-.707L10 11.586l-2.293-2.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l5-5a1 1 0 00.293-.707z"></path>
								</svg>
								<span className="ml-2 text-gray-700 dark:text-gray-300">Unlimited projects</span>
							</li>
							<li className="flex items-center">
								<svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20"
								     xmlns="http://www.w3.org/2000/svg">
									<path fillRule="evenodd" clipRule="evenodd"
									      d="M10 18a8 8 0 100-16 8 8 0 000 16zm5-10a1 1 0 00-1.707-.707L10 11.586l-2.293-2.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l5-5a1 1 0 00.293-.707z"></path>
								</svg>
								<span className="ml-2 text-gray-700 dark:text-gray-300">Unlimited users</span>
							</li>
							<li className="flex items-center">
								<svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20"
								     xmlns="http://www.w3.org/2000/svg">
									<path fillRule="evenodd" clipRule="evenodd"
									      d="M10 18a8 8 0 100-16 8 8 0 000 16zm5-10a1 1 0 00-1.707-.707L10 11.586l-2.293-2.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l5-5a1 1 0 00.293-.707z"></path>
								</svg>
								<span className="ml-2 text-gray-700 dark:text-gray-300">24/7 support</span>
							</li>
							<li className="flex items-center">
								<svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20"
								     xmlns="http://www.w3.org/2000/svg">
									<path fillRule="evenodd" clipRule="evenodd"
									      d="M10 18a8 8 0 100-16 8 8 0 000 16zm5-10a1 1 0 00-1.707-.707L10 11.586l-2.293-2.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l5-5a1 1 0 00.293-.707z"></path>
								</svg>
								<span className="ml-2 text-gray-700 dark:text-gray-300">Advanced analytics</span>
							</li>
						</ul>
					</div>
					<div className="mt-8">
						<a href="#"
						   className="block w-full px-4 py-3 text-center font-medium text-white bg-primary-500 rounded-md hover:bg-primary-600">Start
							free trial
						</a>
					</div>
				</div>
			</div>
		</>
	)
}