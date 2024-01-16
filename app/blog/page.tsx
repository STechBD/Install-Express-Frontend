import { JSX } from 'react'
import fs from 'fs-extra'
import yaml from 'js-yaml'
import Markdown from 'react-markdown'
import Image from 'next/image'
import Link from 'next/link'
import { postList } from '@/app/_function/blog'


interface Post {
	id?: number
	title?: string
	slug?: string
	date?: string
	time?: string
	author?: Array<{
		user?: string
		name?: string
		title?: string
		url?: string
		image?: string
	}>
	image?: string
	description?: string
	category?: Array<string>
	tag?: Array<string>
	content?: string
}

/**
 * Blog list page component.
 *
 * @returns { JSX.Element } Blog list page component.
 * @since 3.0.0
 */
export default function Page(): JSX.Element {
	const post: Post[] = []
	const postUnordered: Post[] = []

	// up one directory from the current directory
	const dirSep: string = process.platform === 'win32' ? '\\' : '/'
	const blogDir: string = fs.realpathSync('.') + dirSep + 'app' + dirSep + '_blog' + dirSep

	// get the list of directories in the _blog directory
	const blogList: string[] = fs.readdirSync(blogDir)

	// loop through each directory
	blogList.map((item: string): void => {
		// check if post.md exists in the slug directory
		const postPath: string = `${ blogDir + item + dirSep }post.md`
		const postExists: boolean = fs.pathExistsSync(postPath)

		if (postExists) {
			// get post.md content
			const postFull: string = fs.readFileSync(postPath, 'utf8')

			// get post.md meta data
			const postMeta: string = postFull.split('---')[1]
			const postContent: string = postFull.split('---')[2]
			const postMetaObject: Post = yaml.load(postMeta) as Post
			const postObject: Post = {
				...postMetaObject,
				content: postContent,
			}

			postUnordered.push(postObject)
		}
	})

	postUnordered.sort((a: Post, b: Post): number => {
		const aDate: string = a.date + ' ' + a.time
		const bDate: string = b.date + ' ' + b.time

		return aDate > bDate ? -1 : 1
	}).map((item: Post, index: number): void => {
		item.id = index

		post.push(item)
	})

	return (
		<>
			<section className="bg-white dark:bg-gray-900">
				<div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
					<div className="mx-auto max-w-screen-sm text-center lg:mb-16 mb-8">
						<h2 className="mb-4 text-3xl lg:text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
							Our Blog
						</h2>
						<p className="font-light text-gray-500 sm:text-xl dark:text-gray-400">
							We use an agile approach to test assumptions and connect with the needs of your audience
							early and often.
						</p>
					</div>
					<div className="grid gap-8 lg:grid-cols-2">
						{
							postList.map((item: any): JSX.Element => {
								const date: string = item.date instanceof Date ? item.date.toISOString() : item.date
								const content: JSX.Element = Markdown(item.content)

								return (
									<article key={ item.id }
									         className="p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
										<div className="flex justify-between items-center mb-5 text-gray-500">
											<span
												className="bg-primary-100 text-primary-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-primary-200 dark:text-primary-800">
												<svg className="mr-1 w-3 h-3" fill="currentColor" viewBox="0 0 20 20"
												     xmlns="http://www.w3.org/2000/svg">
													<path fillRule="evenodd" clipRule="evenodd"
													      d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z"></path>
													<path d="M15 7h1a2 2 0 012 2v5.5a1.5 1.5 0 01-3 0V7z"></path>
												</svg>
												{ item.category }
											</span>
											<span className="text-sm">
												{ date }
											</span>
										</div>
										<h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
											<Link href={ item.slug }>
												{ item.title }
											</Link>
										</h2>
										<p className="mb-5 font-light text-gray-500 dark:text-gray-400">
											{ content }
										</p>
										<div className="flex justify-between items-center">
											<div className="flex items-center space-x-4">
												<Image className="w-7 h-7 rounded-full" height={ 7 } width={ 7 }
												       src={ item.author } alt={ item.author }/>
												<Link href={ '/author/' + item.author }>
												<span className="font-medium dark:text-white">
													{ item.author }
												</span>
												</Link>
											</div>
											<Link href={ '/' + item.slug }
											      className="inline-flex items-center font-medium text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white">
												Read more
												<svg className="ml-2 w-4 h-4" fill="currentColor" viewBox="0 0 20 20"
												     xmlns="http://www.w3.org/2000/svg">
													<path fillRule="evenodd" clipRule="evenodd"
													      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"></path>
												</svg>
											</Link>
										</div>
									</article>
								)
							})
						}
					</div>
					<div className="grid gap-8 lg:grid-cols-2">
						{
							post.map((item: any): JSX.Element => {
								const date: string = item.date instanceof Date ? item.date.toISOString() : item.date
								const content: JSX.Element = Markdown(item.content)

								return (
									<article key={ item.id }
									         className="p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
										<div className="flex justify-between items-center mb-5 text-gray-500">
											<span
												className="bg-primary-100 text-primary-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-primary-200 dark:text-primary-800">
												<svg className="mr-1 w-3 h-3" fill="currentColor" viewBox="0 0 20 20"
												     xmlns="http://www.w3.org/2000/svg">
													<path fillRule="evenodd" clipRule="evenodd"
													      d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z"></path>
													<path d="M15 7h1a2 2 0 012 2v5.5a1.5 1.5 0 01-3 0V7z"></path>
												</svg>
												{ item.category }
											</span>
											<span className="text-sm">
												{ date }
											</span>
										</div>
										<h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
											<Link href={ item.slug }>
												{ item.title }
											</Link>
										</h2>
										<p className="mb-5 font-light text-gray-500 dark:text-gray-400">
											{ content }
										</p>
										<div className="flex justify-between items-center">
											<div className="flex items-center space-x-4">
												<Image className="w-7 h-7 rounded-full" height={ 7 } width={ 7 }
												       src={ item.author[0].image } alt={ item.author[0].title }/>
												<Link href={ '/author/' + item.author[0].user }>
												<span className="font-medium dark:text-white">
													{ item.author[0].name }
												</span>
												</Link>
											</div>
											<Link href={ '/' + item.slug }
											      className="inline-flex items-center font-medium text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white">
												Read more
												<svg className="ml-2 w-4 h-4" fill="currentColor" viewBox="0 0 20 20"
												     xmlns="http://www.w3.org/2000/svg">
													<path fillRule="evenodd" clipRule="evenodd"
													      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"></path>
												</svg>
											</Link>
										</div>
									</article>
								)
							})
						}
					</div>
				</div>
			</section>
		</>
	)
}
