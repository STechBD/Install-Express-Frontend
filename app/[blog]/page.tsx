import { JSX } from 'react'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import Image from 'next/image'
import Link from 'next/link'
import Hero from '@/app/[blog]/hero'
import Index from '@/app/[blog]/index'


interface User {
	id?: number
	username?: string
	firstname?: string
	lastname?: string
	image?: string
	role?: string
	company?: string
	position?: string
	about?: string
}

interface Post {
	id?: number
	title?: string
	slug?: string
	author?: string
	published?: string
	image?: string
	category?: string
	view?: number
	content?: string
}

interface Category {
	id?: number
	slug?: string
	name?: string
}


/**
 * Generate metadata for the blog post page.
 *
 * @param { string } slug The post slug.
 * @returns { Promise<{ title: string }> } The metadata.
 * @since 3.0.0
 */
export async function generateMetadata({ params }: { params: { blog: string } }) {
	const slug: string = params.blog
	const post: Post = await postData(slug)

	return {
		title: post.title,
	}
}


/**
 * Fetch the post data from API server.
 *
 * @param slug The post slug.
 * @returns { Promise<Post> } The post data.
 * @since 3.0.0
 */
async function postData(slug: string): Promise<Post> {
	const response: Response = await fetch('https://api.stechbd.net/blog/post/' + slug)
	const data = await response.json()
	return data.data
}


/**
 * Fetch the user data from API server.
 *
 * @param username The username.
 * @returns { Promise<User> } The user data.
 * @since 3.0.0
 */
async function userData(username: string): Promise<User> {
	const response: Response = await fetch('https://api.stechbd.net/user/' + username)
	const data = await response.json()
	return data.data
}


/**
 * Fetch the category data from API server.
 *
 * @param id The category ID.
 * @returns { Promise<Category> } The category data.
 * @since 3.0.0
 */
async function categoryData(id: string): Promise<Category> {
	const response: Response = await fetch('https://api.stechbd.net/blog/category/' + id)
	const data = await response.json()
	return data.data
}


/**
 * Blog post page component.
 *
 * @returns { JSX.Element } - Blog post page component.
 * @since 3.0.0
 */
export default async function Page({ params }: { params: { blog: string } }): Promise<JSX.Element> {
	const slug: string = params.blog
	const post: Post = await postData(slug)

	const title: string = post.title ?? 'Default Title'
	const thumbnail: string = '/image/Banner.webp'
	const published: string = post.published ?? '2022-02-08'
	const date: Date = new Date(published)
	const options: Intl.DateTimeFormatOptions = {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
		hour: 'numeric',
		minute: 'numeric',
		hour12: true,
	}
	const publishedDate: string = date.toLocaleDateString('en-US', options)
	const content: JSX.Element = post.content ? (
		<Markdown remarkPlugins={ [ remarkGfm ] }>
			{ post.content }
		</Markdown>
	) : (
		<>No content</>
	)

	const userID: string = post.author ?? '0'
	const user: User = await userData(userID)
	const userUsername: string = user.username ?? 'username'
	const userName: string = user.firstname + ' ' + user.lastname
	const userImage: string = user.image ?? 'https://github.com/STechBD.png'
	const userCompany: string = user.company ?? 'Default Company'
	const userPosition: string | null = user.position ?? null
	const userAbout: string = user.about ?? 'No Information'

	const categoryID: string = post.category ? post.category.split(',')[0] : '0'
	const category: Category = await categoryData(categoryID)

	return (
		<>
			<Hero/>
			<div className="relative h-full">
				<div className="max-w-7xl mx-auto px-4 sm:px-6">
					<div className="pt-32 md:pt-40">
						<div className="max-w-4xl flex flex-col items-center mx-auto text-center">
							<h1 className="text-5xl md:text-6xl font-extrabold text-white tracking-tight sm:text-7xl">
								<span className="block md:inline sm:block bg-primary text-white h-12">
									{ title }
								</span>
							</h1>
							<div className="mt-8">
								<Image src={ thumbnail } alt={ title } height={ 628 } width={ 1200 }/>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="relative lg:grid lg:grid-cols-4 mt-12 mb-24">
				<div className="px-4 mb-4 lg:mb-0">
					<div
						className="p-8 mx-auto w-full bg-white bg-opacity-50 rounded-lg format format-sm sm:format-base lg:format-lg format-blue dark:format-invert dark:bg-opacity-5"
					>
						<div
							className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white"
						>
							<Image className="mr-4 w-16 h-16 rounded-full"
							       src={ userImage }
							       alt={ userName } height={ 100 }
							       width={ 100 }/>
							<div>
								<Link href={ '/author/' + userUsername } rel="author"
								      className="text-xl font-bold text-gray-900 dark:text-white"
								>
									{ userName }
								</Link>
								<p className="text-base text-gray-500 dark:text-gray-400">
									{ userPosition && (userPosition + ' at ') }{ userCompany }
								</p>
							</div>
						</div>
						<div className="mt-4 text-gray-900">
							{ userAbout }
						</div>
					</div>
				</div>
				<div className="col-span-2 antialiased">
					<div className="flex justify-between px-4 mx-auto">
						<article
							className="p-8 mx-auto w-full bg-white bg-opacity-50 rounded-lg format format-sm sm:format-base lg:format-lg format-blue dark:format-invert dark:bg-opacity-5"
						>
							<header className="mb-4 lg:mb-6 not-format">
								<address className="flex items-center mb-6 not-italic">
									<div
										className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white"
									>
										<Image className="mr-4 w-16 h-16 rounded-full"
										       src={ userImage }
										       alt={ userName } height={ 100 }
										       width={ 100 }/>
										<div>
											<Link href={ '/author/' + userUsername } rel="author"
											      className="text-xl font-bold text-gray-900 dark:text-white"
											>
												{ userName }
											</Link>
											<p className="text-base text-gray-500 dark:text-gray-400">
												{ userPosition && (userPosition + ' at ') }{ userCompany }
											</p>
											<p className="text-base text-gray-500 dark:text-gray-400">
												<time dateTime={ published } title={ publishedDate }>
													{ publishedDate }
												</time>
											</p>
										</div>
									</div>
								</address>
								<h1 className="mb-4 text-3xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl dark:text-white">
									{ title }
								</h1>
								<p className="mb-6 text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100">
									<Link href={ '/category/' + category.slug }>
										{ category.name }
									</Link>
								</p>
							</header>
							<div className="mb-6 not-format dark:text-white">
								<div className="post-content">
									{ content }
								</div>
							</div>
							{
								process.env.NODE_ENV === 'development' && (
									<section className="not-format">
										<div className="flex justify-between items-center mb-6">
											<h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
												Discussion (20)
											</h2>
										</div>
										<form className="mb-6">
											<div
												className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
												<label className="sr-only">Your comment</label>
												<textarea id="comment" rows={ 6 }
												          className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
												          placeholder="Write a comment..." required></textarea>
											</div>
											<button type="submit"
											        className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
												Post comment
											</button>
										</form>
										<article className="p-6 mb-6 text-base bg-white rounded-lg dark:bg-gray-900">
											<footer className="flex justify-between items-center mb-2">
												<div className="flex items-center">
													<p className="inline-flex items-center mr-3 font-semibold text-sm text-gray-900 dark:text-white">
														<Image
															className="mr-2 w-6 h-6 rounded-full"
															src="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
															alt="Michael Gough" height={ 100 } width={ 100 }/>
														Michael Gough
													</p>
													<p className="text-sm text-gray-600 dark:text-gray-400">
														<time dateTime="2022-02-08"
														      title="February 8th, 2022">Feb. 8, 2022
														</time>
													</p>
												</div>
												<button id="dropdownComment1Button" data-dropdown-toggle="dropdownComment1"
												        className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:text-gray-400 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
												        type="button">
													<svg className="w-4 h-4" aria-hidden="true"
													     xmlns="http://www.w3.org/2000/svg"
													     fill="currentColor" viewBox="0 0 16 3">
														<path
															d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z"/>
													</svg>
													<span className="sr-only">Comment settings</span>
												</button>
												{/*<!-- Dropdown menu -->*/ }
												<div id="dropdownComment1"
												     className="hidden z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
													<ul className="py-1 text-sm text-gray-700 dark:text-gray-200"
													    aria-labelledby="dropdownMenuIconHorizontalButton">
														<li>
															<a href="#"
															   className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Edit</a>
														</li>
														<li>
															<a href="#"
															   className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Remove</a>
														</li>
														<li>
															<a href="#"
															   className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Report</a>
														</li>
													</ul>
												</div>
											</footer>
											<p>
												Very straight-to-point article. Really worth time reading. Thank you! But
												tools are just the instruments for the UX designers. The knowledge of the
												design tools are as important as the creation of the design strategy.
											</p>
											<div className="flex items-center mt-4 space-x-4">
												<button type="button"
												        className="flex items-center font-medium text-sm text-gray-500 hover:underline dark:text-gray-400">
													<svg className="mr-1.5 w-3 h-3" aria-hidden="true"
													     xmlns="http://www.w3.org/2000/svg" fill="currentColor"
													     viewBox="0 0 20 18">
														<path
															d="M18 0H2a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h2v4a1 1 0 0 0 1.707.707L10.414 13H18a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5 4h2a1 1 0 1 1 0 2h-2a1 1 0 1 1 0-2ZM5 4h5a1 1 0 1 1 0 2H5a1 1 0 0 1 0-2Zm2 5H5a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2Zm9 0h-6a1 1 0 0 1 0-2h6a1 1 0 1 1 0 2Z"/>
													</svg>
													Reply
												</button>
											</div>
										</article>
										<article
											className="p-6 mb-6 ml-6 lg:ml-12 text-base bg-white rounded-lg dark:bg-gray-900">
											<footer className="flex justify-between items-center mb-2">
												<div className="flex items-center">
													<p className="inline-flex items-center mr-3 font-semibold text-sm text-gray-900 dark:text-white">
														<Image
															className="mr-2 w-6 h-6 rounded-full"
															src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
															alt="Jese Leos" height={ 100 } width={ 100 }/>Jese Leos</p>
													<p className="text-sm text-gray-600 dark:text-gray-400">
														<time dateTime="2022-02-12"
														      title="February 12th, 2022">Feb. 12, 2022
														</time>
													</p>
												</div>
												<button id="dropdownComment2Button" data-dropdown-toggle="dropdownComment2"
												        className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:text-gray-400 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
												        type="button">
													<svg className="w-4 h-4" aria-hidden="true"
													     xmlns="http://www.w3.org/2000/svg"
													     fill="currentColor" viewBox="0 0 16 3">
														<path
															d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z"/>
													</svg>
													<span className="sr-only">Comment settings</span>
												</button>
												{/*<!-- Dropdown menu -->*/ }
												<div id="dropdownComment2"
												     className="hidden z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
													<ul className="py-1 text-sm text-gray-700 dark:text-gray-200"
													    aria-labelledby="dropdownMenuIconHorizontalButton">
														<li>
															<a href="#"
															   className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Edit</a>
														</li>
														<li>
															<a href="#"
															   className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Remove</a>
														</li>
														<li>
															<a href="#"
															   className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Report</a>
														</li>
													</ul>
												</div>
											</footer>
											<p>Much appreciated! Glad you liked it ☺️</p>
											<div className="flex items-center mt-4 space-x-4">
												<button type="button"
												        className="flex items-center font-medium text-sm text-gray-500 hover:underline dark:text-gray-400">
													<svg className="mr-1.5 w-3 h-3" aria-hidden="true"
													     xmlns="http://www.w3.org/2000/svg" fill="currentColor"
													     viewBox="0 0 20 18">
														<path
															d="M18 0H2a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h2v4a1 1 0 0 0 1.707.707L10.414 13H18a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5 4h2a1 1 0 1 1 0 2h-2a1 1 0 1 1 0-2ZM5 4h5a1 1 0 1 1 0 2H5a1 1 0 0 1 0-2Zm2 5H5a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2Zm9 0h-6a1 1 0 0 1 0-2h6a1 1 0 1 1 0 2Z"/>
													</svg>
													Reply
												</button>
											</div>
										</article>
										<article
											className="p-6 mb-6 text-base bg-white border-t border-gray-200 dark:border-gray-700 dark:bg-gray-900">
											<footer className="flex justify-between items-center mb-2">
												<div className="flex items-center">
													<p className="inline-flex items-center mr-3 font-semibold text-sm text-gray-900 dark:text-white">
														<Image
															className="mr-2 w-6 h-6 rounded-full"
															src="https://flowbite.com/docs/images/people/profile-picture-3.jpg"
															alt="Bonnie Green" height={ 100 } width={ 100 }/>Bonnie Green
													</p>
													<p className="text-sm text-gray-600 dark:text-gray-400">
														<time dateTime="2022-03-12"
														      title="March 12th, 2022">Mar. 12, 2022
														</time>
													</p>
												</div>
												<button id="dropdownComment3Button" data-dropdown-toggle="dropdownComment3"
												        className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:text-gray-400 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
												        type="button">
													<svg className="w-4 h-4" aria-hidden="true"
													     xmlns="http://www.w3.org/2000/svg"
													     fill="currentColor" viewBox="0 0 16 3">
														<path
															d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z"/>
													</svg>
													<span className="sr-only">Comment settings</span>
												</button>
												{/*<!-- Dropdown menu -->*/ }
												<div id="dropdownComment3"
												     className="hidden z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
													<ul className="py-1 text-sm text-gray-700 dark:text-gray-200"
													    aria-labelledby="dropdownMenuIconHorizontalButton">
														<li>
															<a href="#"
															   className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Edit</a>
														</li>
														<li>
															<a href="#"
															   className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Remove</a>
														</li>
														<li>
															<a href="#"
															   className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Report</a>
														</li>
													</ul>
												</div>
											</footer>
											<p>The article covers the essentials, challenges, myths and stages the UX
												designer
												should consider while creating the design strategy.</p>
											<div className="flex items-center mt-4 space-x-4">
												<button type="button"
												        className="flex items-center font-medium text-sm text-gray-500 hover:underline dark:text-gray-400">
													<svg className="mr-1.5 w-3 h-3" aria-hidden="true"
													     xmlns="http://www.w3.org/2000/svg" fill="currentColor"
													     viewBox="0 0 20 18">
														<path
															d="M18 0H2a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h2v4a1 1 0 0 0 1.707.707L10.414 13H18a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5 4h2a1 1 0 1 1 0 2h-2a1 1 0 1 1 0-2ZM5 4h5a1 1 0 1 1 0 2H5a1 1 0 0 1 0-2Zm2 5H5a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2Zm9 0h-6a1 1 0 0 1 0-2h6a1 1 0 1 1 0 2Z"/>
													</svg>
													Reply
												</button>
											</div>
										</article>
										<article
											className="p-6 text-base bg-white border-t border-gray-200 dark:border-gray-700 dark:bg-gray-900">
											<footer className="flex justify-between items-center mb-2">
												<div className="flex items-center">
													<p className="inline-flex items-center mr-3 font-semibold text-sm text-gray-900 dark:text-white">
														<Image
															className="mr-2 w-6 h-6 rounded-full"
															src="https://flowbite.com/docs/images/people/profile-picture-4.jpg"
															alt="Helene Engels" height={ 100 } width={ 100 }/>Helene Engels
													</p>
													<p className="text-sm text-gray-600 dark:text-gray-400">
														<time dateTime="2022-06-23"
														      title="June 23rd, 2022">Jun. 23, 2022
														</time>
													</p>
												</div>
												<button id="dropdownComment4Button" data-dropdown-toggle="dropdownComment4"
												        className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:text-gray-400 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
												        type="button">
													<svg className="w-4 h-4" aria-hidden="true"
													     xmlns="http://www.w3.org/2000/svg"
													     fill="currentColor" viewBox="0 0 16 3">
														<path
															d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z"/>
													</svg>
												</button>
												{/*<!-- Dropdown menu -->*/ }
												<div id="dropdownComment4"
												     className="hidden z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
													<ul className="py-1 text-sm text-gray-700 dark:text-gray-200"
													    aria-labelledby="dropdownMenuIconHorizontalButton">
														<li>
															<a href="#"
															   className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Edit</a>
														</li>
														<li>
															<a href="#"
															   className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Remove</a>
														</li>
														<li>
															<a href="#"
															   className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Report</a>
														</li>
													</ul>
												</div>
											</footer>
											<p>Thanks for sharing this. I do came from the Backend development and explored
												some
												of
												the tools to design my Side Projects.</p>
											<div className="flex items-center mt-4 space-x-4">
												<button type="button"
												        className="flex items-center font-medium text-sm text-gray-500 hover:underline dark:text-gray-400">
													<svg className="mr-1.5 w-3 h-3" aria-hidden="true"
													     xmlns="http://www.w3.org/2000/svg" fill="currentColor"
													     viewBox="0 0 20 18">
														<path
															d="M18 0H2a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h2v4a1 1 0 0 0 1.707.707L10.414 13H18a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5 4h2a1 1 0 1 1 0 2h-2a1 1 0 1 1 0-2ZM5 4h5a1 1 0 1 1 0 2H5a1 1 0 0 1 0-2Zm2 5H5a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2Zm9 0h-6a1 1 0 0 1 0-2h6a1 1 0 1 1 0 2Z"/>
													</svg>
													Reply
												</button>
											</div>
										</article>
									</section>
								)
							}
						</article>
					</div>
				</div>
				<div className="px-4 mb-4 lg:mb-0">
					<div
						className="p-8 mx-auto w-full bg-white bg-opacity-50 rounded-lg format format-sm sm:format-base lg:format-lg format-blue dark:format-invert dark:bg-opacity-5"
					>
						<h2 className="text-xl font-bold text-gray-900 dark:text-white">
							Index
						</h2>
						<Index content={ content }/>
					</div>
				</div>
				{
					process.env.NODE_ENV === 'development' && (
						<>
							<aside aria-label="Related articles" className="py-8 lg:py-24 bg-gray-50 dark:bg-gray-800">
								<div className="px-4 mx-auto max-w-screen-xl">
									<h2 className="mb-8 text-2xl font-bold text-gray-900 dark:text-white">Related
										articles</h2>
									<div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
										<article className="max-w-xs">
											<a href="#">
												<Image
													src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/article/blog-1.png"
													className="mb-5 rounded-lg" alt="Image 1" height={ 100 } width={ 100 }/>
											</a>
											<h2 className="mb-2 text-xl font-bold leading-tight text-gray-900 dark:text-white">
												<a href="#">Our first office</a>
											</h2>
											<p className="mb-4 text-gray-500 dark:text-gray-400">Over the past year,
												Volosoft has
												undergone many changes! After months of preparation.</p>
											<a href="#"
											   className="inline-flex items-center font-medium underline underline-offset-4 text-primary-600 dark:text-primary-500 hover:no-underline">
												Read in 2 minutes
											</a>
										</article>
										<article className="max-w-xs">
											<a href="#">
												<Image
													src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/article/blog-2.png"
													className="mb-5 rounded-lg" alt="Image 2" height={ 100 } width={ 100 }/>
											</a>
											<h2 className="mb-2 text-xl font-bold leading-tight text-gray-900 dark:text-white">
												<a href="#">Enterprise design tips</a>
											</h2>
											<p className="mb-4  text-gray-500 dark:text-gray-400">Over the past year,
												Volosoft has
												undergone many changes! After months of preparation.</p>
											<a href="#"
											   className="inline-flex items-center font-medium underline underline-offset-4 text-primary-600 dark:text-primary-500 hover:no-underline">
												Read in 12 minutes
											</a>
										</article>
										<article className="max-w-xs">
											<a href="#">
												<Image
													src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/article/blog-3.png"
													className="mb-5 rounded-lg" alt="Image 3" height={ 100 } width={ 100 }/>
											</a>
											<h2 className="mb-2 text-xl font-bold leading-tight text-gray-900 dark:text-white">
												<a href="#">We partnered with Google</a>
											</h2>
											<p className="mb-4  text-gray-500 dark:text-gray-400">Over the past year,
												Volosoft has
												undergone many changes! After months of preparation.</p>
											<a href="#"
											   className="inline-flex items-center font-medium underline underline-offset-4 text-primary-600 dark:text-primary-500 hover:no-underline">
												Read in 8 minutes
											</a>
										</article>
										<article className="max-w-xs">
											<a href="#">
												<Image
													src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/article/blog-4.png"
													className="mb-5 rounded-lg" alt="Image 4" height={ 100 } width={ 100 }/>
											</a>
											<h2 className="mb-2 text-xl font-bold leading-tight text-gray-900 dark:text-white">
												<a href="#">Our first project with React</a>
											</h2>
											<p className="mb-4  text-gray-500 dark:text-gray-400">Over the past year,
												Volosoft has
												undergone many changes! After months of preparation.</p>
											<a href="#"
											   className="inline-flex items-center font-medium underline underline-offset-4 text-primary-600 dark:text-primary-500 hover:no-underline">
												Read in 4 minutes
											</a>
										</article>
									</div>
								</div>
							</aside>

							<section className="bg-white dark:bg-gray-900">
								<div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
									<div className="mx-auto max-w-screen-md sm:text-center">
										<h2 className="mb-4 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl dark:text-white">Sign
											up for our newsletter</h2>
										<p className="mx-auto mb-8 max-w-2xl  text-gray-500 md:mb-12 sm:text-xl dark:text-gray-400">Stay
											up to date with the roadmap progress, announcements and exclusive discounts feel
											free to
											sign up with your email.</p>
										<form action="#">
											<div
												className="items-center mx-auto mb-3 space-y-4 max-w-screen-sm sm:flex sm:space-y-0">
												<div className="relative w-full">
													<label
														className="hidden mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Email
														address</label>
													<div
														className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
														<svg className="w-4 h-4 text-gray-500 dark:text-gray-400"
														     aria-hidden="true"
														     xmlns="http://www.w3.org/2000/svg" fill="currentColor"
														     viewBox="0 0 20 16">
															<path
																d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z"/>
															<path
																d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z"/>
														</svg>
													</div>
													<input
														className="block p-3 pl-9 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 sm:rounded-none sm:rounded-l-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
														placeholder="Enter your email" type="email" id="email"
														required={ false }/>
												</div>
												<div>
													<button type="submit"
													        className="py-3 px-5 w-full text-sm font-medium text-center text-white rounded-lg border cursor-pointer bg-primary-700 border-primary-600 sm:rounded-none sm:rounded-r-lg hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Subscribe
													</button>
												</div>
											</div>
											<div
												className="mx-auto max-w-screen-sm text-sm text-left text-gray-500 newsletter-form-footer dark:text-gray-300"
											>
												We care about the protection of your data. <a href="#"
												                                              className="font-medium text-primary-600 dark:text-primary-500 hover:underline">Read
												our Privacy Policy</a>.
											</div>
										</form>
									</div>
								</div>
							</section>
						</>
					)
				}
			</div>
		</>
	)
}
