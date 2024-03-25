import { JSX } from 'react'
import { Metadata } from 'next'
import { DefaultEffect } from '@/app/_component/background'
import Hero from './hero'


/**
 * The metadata for the Frequently Asked Questions page.
 *
 * @constant title { string }
 * @constant description { string }
 * @constant metadata { Metadata }
 *
 * @since 3.0.0
 */
const title: string = 'Frequency Asked Questions (FAQ)'
const description: string = 'Our frequently asked questions page provides answers to common questions.'
export const metadata: Metadata = {
	title,
	description,
	openGraph: {
		title,
		description,
	},
	twitter: {
		title,
		description,
	},
}


/**
 * The Frequently Asked Questions page component.
 *
 * @returns { JSX.Element } The Page component.
 * @since 3.0.0
 */
export default function Page(): JSX.Element {
	return (
		<>
			<Hero/>
			<div className="relative isolate px-6 py-24 lg:px-8 text">
				<DefaultEffect/>
				<h2 className="lg:px-16 md:px-20 py-10text-4xl font-bold tracking-tight text-primary sm:text-6xl">
					Frequently Asked Questions (FAQ)
				</h2>
				<p className="lg:px-16 md:px-20 py-10 text-xl text-gray-800 dark:text-gray-200">
					Our frequently asked questions page provides answers to common questions.
				</p>
				<div className="lg:px-16 md:px-20 py-10">
					<p className="mb-4 text-xl text-gray-800 dark:text-gray-200">
						This privacy policy sets out how <span
						className="text-white bg-primary"><strong>S Technologies</strong></span> uses and protects any
						information that you give <span
						className="text-white bg-primary"><strong>S Technologies</strong></span> when you use this
						website.<span className="text-white bg-primary"><strong>S Technologies</strong></span> is
						committed to ensuring that your privacy is protected. Should we ask you to provide certain
						information by which you can be identified when using this website, then you can be assured that
						it will only be used in accordance with this privacy statement.<span
						className="text-white bg-primary"><strong>S Technologies</strong></span> may change this policy
						from time to time by updating this page. You should check this page from time to time to ensure
						that you are happy with any changes. This policy is effective from August 14, 2013.
					</p>

					<h3 className="text-2xl font-bold tracking-tight text-primary sm:text-3xl">
						Information We Collect
					</h3>
					<p className="mb-4 text-xl text-gray-800 dark:text-gray-200">
						We may collect the following information:
						<ul>
							<li>
								Name
							</li>
							<li>
								Contact Information including email address
							</li>
							<li>Demographic Information such as postcode, preferences and interests</li>
						</ul>
					</p>

					<h3 className="text-2xl font-bold tracking-tight text-primary sm:text-3xl">
						What We Do With The Information We Gather
					</h3>
					<p className="mb-4 text-xl text-gray-800 dark:text-gray-200">
						We require this information to understand your needs and provide you with a better service, and
						in particular for the following reasons:
						<ul>
							<li>
								Internal record keeping.
							</li>
							<li>
								We may use the information to improve our products and services.
							</li>
							<li>
								We may periodically send promotional emails about new products, special offers or other
								information which we think you may find interesting using the email address which you
								have provided.
							</li>
							<li>
								From time to time, we may also use your information to contact you for market research
								purposes. We may contact you by email, phone or mail. We may use the information to
								customize the website according to your interests.
							</li>
						</ul>
					</p>

					<h3 className="text-2xl font-bold tracking-tight text-primary sm:text-3xl">
						Security
					</h3>
					<p className="mb-4 text-xl text-gray-800 dark:text-gray-200">
						We are committed to ensuring that your information is secure. In order to prevent unauthorised
						access or disclosure, we have put in place suitable physical, electronic and managerial
						procedures to safeguard and secure the information we collect online.
					</p>

					<h3 className="text-2xl font-bold tracking-tight text-primary sm:text-3xl">
						How We Use Cookies
					</h3>
					<p className="mb-4 text-xl text-gray-800 dark:text-gray-200">
						A cookie is a small file which asks permission to be placed on your computer’s hard drive. Once
						you agree, the file is added and the cookie helps analyse web traffic or lets you know when you
						visit a particular site. Cookies allow web applications to respond to you as an individual.
					</p>
					<p className="mb-4 text-xl text-gray-800 dark:text-gray-200">
						The web application can tailor its operations to your needs, likes and dislikes by gathering and
						remembering information about your preferences. We use traffic log cookies to identify which
						pages are being used. This helps us analyse data about web page traffic and improve our website
						in order to tailor it to customer needs. We only use this information for statistical analysis
						purposes and then the data is removed from the system. Overall, cookies help us provide you with
						a better website, by enabling us to monitor which pages you find useful and which you do not. A
						cookie in no way gives us access to your computer or any information about you, other than the
						data you choose to share with us. You can choose to accept or decline cookies. Most web browsers
						automatically accept cookies, but you can usually modify your browser setting to decline cookies
						if you prefer. This may prevent you from taking full advantage of the website.
					</p>

					<h3 className="text-2xl font-bold tracking-tight text-primary sm:text-3xl">
						Links To Other Websites
					</h3>
					<p className="mb-4 text-xl text-gray-800 dark:text-gray-200">
						Our website may contain links to other websites of interest. However, once you have used these
						links to leave our site, you should note that we do not have any control over that other
						website. Therefore, we cannot be responsible for the protection and privacy of any information
						which you provide whilst visiting such sites and such sites are not governed by this privacy
						statement. You should exercise caution and look at the privacy statement applicable to the
						website in question.
					</p>

					<h3 className="text-2xl font-bold tracking-tight text-primary sm:text-3xl">
						Fraudulent Orders
					</h3>
					<p className="mb-4 text-xl text-gray-800 dark:text-gray-200">
						<span className="text-white bg-primary"><strong>S Technologies</strong></span> use appropriate
						fraud screening methods to ensure that all payments accepted by <span
						className="text-white bg-primary"><strong>S Technologies</strong></span> are legal and in no way
						associated with fraud. If at any time a order / payment is flagged for fraud an immediate refund
						will be issued and proof of account ownership will be requested wether it be proof of identity
						or any other means. If you are found to be ordering services on a fraudlent basis then <span
						className="text-white bg-primary"><strong>STechnologies</strong></span> reserve the right to
						hand any information onto the appropiate legal authorities for further investigation.
					</p>

					<h3 className="text-2xl font-bold tracking-tight text-primary sm:text-3xl">
						Controlling Your Personal Information
					</h3>
					<p className="mb-4 text-xl text-gray-800 dark:text-gray-200">
						You may choose to restrict the collection or use of your personal information in the
						following ways:
						<ul>
							<li>
								Whenever you are asked to fill in a form on the website, look for the box that you can
								click to indicate that you do not want the information to be used by anybody for direct
								marketing purposes
							</li>
							<li>
								If you have previously agreed to us using your personal information for direct marketing
								purposes, you may change your mind at any time by writing to or emailing us at
								billing[@]stechbd.net
							</li>
						</ul>
					</p>
					<p className="mb-4 text-xl text-gray-800 dark:text-gray-200">
						We will not sell, distribute or lease your personal information to third parties unless we have
						your permission or are required by law to do so. We may use your personal information to send
						you promotional information about third parties which we think you may find interesting if you
						tell us that you wish this to happen. You may request details of personal information which we
						hold about you under the Data Protection Act 1998. A small fee will be payable. If you would
						like a copy of the information held on you please write to billing[@]stechbd.net
					</p>
					<p className="mb-4 text-xl text-gray-800 dark:text-gray-200">
						If you believe that any information we are holding on you is incorrect or incomplete, please
						email us as soon as possible, at the above address. We will promptly correct any information
						found to be incorrect.
					</p>
				</div>
			</div>
		</>
	)
}
