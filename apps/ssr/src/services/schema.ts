export type HomeSchema = {
	title: string
	url: string
	description: string
	socialSharingImage: string
	headline: string
}

export const getHomeSchema = ({
	title,
	url,
	description,
	socialSharingImage,
	headline
}: HomeSchema): string =>
	JSON.stringify({
		'@context': 'http://schema.org',
		'@type': 'WebPage',
		url,
		name: title,
		description,
		image: socialSharingImage,
		headline,
		inLanguage: 'pt-br',
		creator: 'https://natahouse.com/'
	})
