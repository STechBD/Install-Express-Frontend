'use client'

import { JSX, useEffect } from 'react'


const icon: string = `
<svg id="STechBD_Animated_Icon" class="STechBD_Animated_Icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2000 2000">
	<g id="Icon">
		<circle id="Circle" class="Circle" cx="1000" cy="1003.5" r="1003.5"/>
		<g id="Main">
			<g id="Color">
				<g id="Yellow">
					<path id="Yellow_Shadow" class="Yellow_Shadow"
					      d="m583.3586,956.1719l-245.9232-65.8952c-21.9324-5.8768-44.4762,7.1389-50.353,29.0713l-136.5983,509.7904c-5.8768,21.9323,7.1388,44.4762,29.0712,50.353l509.7903,136.5984c21.9324,5.8768,44.4762-7.1389,50.353-29.0713l41.8517-156.192c-154.4769-99.7708-237.4523-287.2841-198.1917-474.6546Z"/>
					<path id="Yellow_Main" class="Yellow_Main"
					      d="m555.0743,907.1821h0l-245.9232-65.8952c-21.9324-5.8768-44.4762,7.1389-50.353,29.0713l-136.5983,509.7904c-5.8768,21.9323,7.1388,44.4762,29.0712,50.353l509.7903,136.5984c21.9324,5.8768,44.4762-7.1389,50.353-29.0713l41.8517-156.192c-154.4769-99.7708-237.4523-287.2841-198.1917-474.6546Z"/>
				</g>
				<g id="Green">
					<path id="Green_Shadow" class="Green_Shadow"
					      d="m1667.2968,1246.6125l-207.2867-55.5425c-64.1461,195.4949-250.6528,320.5325-450.4197,312.1247h0l-39.0354,145.6811c-5.8768,21.9324,7.1389,44.4762,29.0713,50.353l509.7903,136.5984c21.9324,5.8768,44.4762-7.1389,50.353-29.0713l136.5984-509.7903c5.8768-21.9324-7.1389-44.4762-29.0713-50.353Z"/>
					<path id="Green_Main" class="Green_Main"
					      d="m1639.0125,1197.6227l-207.2867-55.5425c-64.1461,195.4949-250.6528,320.5325-450.4197,312.1247l-39.0354,145.6811c-5.8768,21.9324,7.1389,44.4762,29.0713,50.353l509.7903,136.5984c21.9324,5.8768,44.4762-7.1389,50.353-29.0713l136.5984-509.7903c5.8768-21.9324-7.1389-44.4762-29.0713-50.353Z"/>
				</g>
				<g id="Blue">
					<path id="Blue_Shadow" class="Blue_Shadow"
					      d="m1847.763,569.2396l-509.7904-136.5984c-21.9324-5.8768-44.4762,7.1389-50.353,29.0713l-49.3302,184.102c166.1161,86.3268,263.8087,268.2573,241.4277,456.3257h0l210.1658,56.314c21.9324,5.8768,44.4762-7.1389,50.353-29.0712l136.5984-509.7903c5.8768-21.9324-7.1389-44.4763-29.0713-50.353Z"/>
					<path id="Blue_Main" class="Blue_Main"
					      d="m1819.4787,520.2498l-509.7904-136.5984c-21.9324-5.8768-44.4762,7.1389-50.353,29.0713l-49.3302,184.102c166.116,86.3268,263.8087,268.2573,241.4277,456.3257l210.1658,56.314c21.9324,5.8768,44.4762-7.1389,50.353-29.0712l136.5984-509.7903c5.8768-21.9324-7.1389-44.4763-29.0713-50.353Z"/>
				</g>
				<g id="Red">
					<path id="Red_Shadow" class="Red_Shadow"
					      d="m1005.5249,594.9425l52.2043-194.8285c5.8768-21.9324-7.1388-44.4762-29.0712-50.353l-509.7904-136.5984c-21.9324-5.8768-44.4762,7.1389-50.353,29.0713l-136.5983,509.7904c-5.8768,21.9324,7.1388,44.4762,29.0712,50.353l249.7692,66.9257h0c68.9683-160.8106,224.0724-265.8422,394.7682-274.3604Z"/>
					<path id="Red_Main" class="Red_Main"
					      d="m977.2406,545.9527l52.2043-194.8285c5.8768-21.9324-7.1388-44.4762-29.0712-50.353l-509.7904-136.5984c-21.9324-5.8768-44.4762,7.1389-50.353,29.0713l-136.5983,509.7904c-5.8768,21.9324,7.1388,44.4762,29.0712,50.353l249.7692,66.9257c68.9683-160.8106,224.0724-265.8422,394.7682-274.3604Z"/>
				</g>
			</g>
			<g id="S">
				<g id="S_Shadow">
					<path class="S_Shadow"
					      d="m974.377,1356.2393c-70.2832,0-125.6211-15.6357-166.0156-46.8994-34.0332-26.0049-51.0488-56.0303-51.0488-90.0635,0-17.4316,5.252-31.8867,15.7715-43.3721,10.5117-11.4785,25.0371-17.2236,43.5781-17.2236,24.9023,0,43.1641,12.7295,54.7852,38.1836,15.7715,34.0332,51.4648,51.0498,107.0801,51.0498,47.5879,0,93.6562-10.376,138.209-31.1279,46.2051-21.3037,69.3105-44.6816,69.3105-70.1416,0-34.8633-14.3906-57.8262-43.1641-68.8965-20.4785-8.0215-61.5684-12.7236-123.2656-14.1113-47.873-1.1025-90.7578-10.0977-128.6621-26.9775-51.1934-22.9639-76.3672-55.8877-75.5371-98.7793.8301-53.9551,29.6035-103.4097,86.3281-148.3765,56.7168-44.9604,119.252-67.4438,187.5977-67.4438,27.1133,0,60.5957,6.2256,100.4395,18.6768,49.5254,15.499,74.291,33.3457,74.291,53.54,0,14.3901-4.9805,27.1201-14.9414,38.1836-11.0703,12.4512-25.3164,18.6768-42.748,18.6768-13.0098,0-32.4453-2.7627-58.3125-8.3008-25.877-5.5317-45.4473-8.3008-58.7285-8.3008-35.6934.2788-69.5918,8.8584-101.6855,25.7324-33.2031,17.1592-49.8047,35.8359-49.8047,56.0303,0,10.5186,5.0449,19.1631,15.1504,25.9399,10.0957,6.7832,25.2441,11.5562,45.4453,14.3188,35.4141,1.939,70.6934,3.8779,105.8359,5.8105,61.4258,4.708,109.9844,21.9971,145.6777,51.8799,39.2871,33.2031,58.9355,79.1357,58.9355,137.793,0,71.3867-40.6738,125.4844-122.0215,162.2803-61.9824,27.9434-132.8125,41.9189-212.5,41.9189Z"/>
				</g>
				<g id="S_Main">
					<path class="S_Main"
					      d="m934.377,1316.2393c-70.2832,0-125.6211-15.6357-166.0156-46.8994-34.0332-26.0049-51.0488-56.0303-51.0488-90.0635,0-17.4316,5.252-31.8867,15.7715-43.3721,10.5117-11.4785,25.0371-17.2236,43.5781-17.2236,24.9023,0,43.1641,12.7295,54.7852,38.1836,15.7715,34.0332,51.4648,51.0498,107.0801,51.0498,47.5879,0,93.6562-10.376,138.209-31.1279,46.2051-21.3037,69.3105-44.6816,69.3105-70.1416,0-34.8633-14.3906-57.8262-43.1641-68.8965-20.4785-8.0215-61.5684-12.7236-123.2656-14.1113-47.873-1.1025-90.7578-10.0977-128.6621-26.9775-51.1934-22.9634-76.3672-55.8877-75.5371-98.7793.8301-53.9551,29.6035-103.4097,86.3281-148.3765,56.7168-44.9604,119.252-67.4438,187.5977-67.4438,27.1133,0,60.5957,6.2256,100.4395,18.6768,49.5254,15.499,74.291,33.3457,74.291,53.54,0,14.3901-4.9805,27.1201-14.9414,38.1836-11.0703,12.4512-25.3164,18.6768-42.748,18.6768-13.0098,0-32.4453-2.7627-58.3125-8.3008-25.877-5.5317-45.4473-8.3008-58.7285-8.3008-35.6934.2788-69.5918,8.8584-101.6855,25.7324-33.2031,17.1592-49.8047,35.8359-49.8047,56.0303,0,10.5186,5.0449,19.1631,15.1504,25.9399,10.0957,6.7832,25.2441,11.5562,45.4453,14.3188,35.4141,1.939,70.6934,3.8779,105.8359,5.8105,61.4258,4.708,109.9844,21.9971,145.6777,51.8799,39.2871,33.2031,58.9355,79.1357,58.9355,137.793,0,71.3867-40.6738,125.4844-122.0215,162.2803-61.9824,27.9434-132.8125,41.9189-212.5,41.9189Z"/>
				</g>
			</g>
		</g>
	</g>
</svg>
`


/**
 * Animated SVG logo.
 *
 * @returns { JSX.Element } Animated SVG logo.
 * @since 3.0.0
 */
export default function AnimatedLogo({ design = 'h-8 w-8 sm:h-10 sm:w-10' }: any): JSX.Element {
	useEffect(() => {
		let i: number = 0
		const intervalId = setInterval((): void => {
			const s: number = i % 4
			const paths = document.querySelectorAll('path')

			paths.forEach((path: Element): void => {
				const currentClass: string | null = path.getAttribute('class')

				if (s === 1) {
					if (currentClass === 'Red_Main') {
						path.setAttribute('class', 'Blue_Main')
					} else if (currentClass === 'Blue_Main') {
						path.setAttribute('class', 'Green_Main')
					} else if (currentClass === 'Green_Main') {
						path.setAttribute('class', 'Yellow_Main')
					} else if (currentClass === 'Yellow_Main') {
						path.setAttribute('class', 'Red_Main')
					}

					if (currentClass === 'Red_Shadow') {
						path.setAttribute('class', 'Blue_Shadow')
					} else if (currentClass === 'Blue_Shadow') {
						path.setAttribute('class', 'Green_Shadow')
					} else if (currentClass === 'Green_Shadow') {
						path.setAttribute('class', 'Yellow_Shadow')
					} else if (currentClass === 'Yellow_Shadow') {
						path.setAttribute('class', 'Red_Shadow')
					}
				} else if (s === 2) {
					if (currentClass === 'Red_Main') {
						path.setAttribute('class', 'Green_Main')
					} else if (currentClass === 'Blue_Main') {
						path.setAttribute('class', 'Yellow_Main')
					} else if (currentClass === 'Green_Main') {
						path.setAttribute('class', 'Red_Main')
					} else if (currentClass === 'Yellow_Main') {
						path.setAttribute('class', 'Blue_Main')
					}

					if (currentClass === 'Red_Shadow') {
						path.setAttribute('class', 'Green_Shadow')
					} else if (currentClass === 'Blue_Shadow') {
						path.setAttribute('class', 'Yellow_Shadow')
					} else if (currentClass === 'Green_Shadow') {
						path.setAttribute('class', 'Red_Shadow')
					} else if (currentClass === 'Yellow_Shadow') {
						path.setAttribute('class', 'Blue_Shadow')
					}
				} else if (s === 3) {
					if (currentClass === 'Red_Main') {
						path.setAttribute('class', 'Yellow_Main')
					} else if (currentClass === 'Blue_Main') {
						path.setAttribute('class', 'Red_Main')
					} else if (currentClass === 'Green_Main') {
						path.setAttribute('class', 'Blue_Main')
					} else if (currentClass === 'Yellow_Main') {
						path.setAttribute('class', 'Green_Main')
					}

					if (currentClass === 'Red_Shadow') {
						path.setAttribute('class', 'Yellow_Shadow')
					} else if (currentClass === 'Blue_Shadow') {
						path.setAttribute('class', 'Red_Shadow')
					} else if (currentClass === 'Green_Shadow') {
						path.setAttribute('class', 'Blue_Shadow')
					} else if (currentClass === 'Yellow_Shadow') {
						path.setAttribute('class', 'Green_Shadow')
					}
				} else {
					if (currentClass === 'Red_Main') {
						path.setAttribute('class', 'Red_Main')
					} else if (currentClass === 'Blue_Main') {
						path.setAttribute('class', 'Blue_Main')
					} else if (currentClass === 'Green_Main') {
						path.setAttribute('class', 'Green_Main')
					} else if (currentClass === 'Yellow_Main') {
						path.setAttribute('class', 'Yellow_Main')
					}

					if (currentClass === 'Red_Shadow') {
						path.setAttribute('class', 'Red_Shadow')
					} else if (currentClass === 'Blue_Shadow') {
						path.setAttribute('class', 'Blue_Shadow')
					} else if (currentClass === 'Green_Shadow') {
						path.setAttribute('class', 'Green_Shadow')
					} else if (currentClass === 'Yellow_Shadow') {
						path.setAttribute('class', 'Yellow_Shadow')
					}
				}

				i++
			})
		}, 3000)

		return () => clearInterval(intervalId)
	}, [])

	return (
		<>
			<div className={ design } dangerouslySetInnerHTML={ { __html: icon } }/>
		</>
	)
}
