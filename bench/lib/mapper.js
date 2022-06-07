export function mapperFunc(item) {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve(item)
		}, 2500)
	})
}
