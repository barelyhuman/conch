/**
 * @typedef {object} Options
 * @property {number} limit
 */

/**
 * @callback MapFunction
 * @param {any} value
 * @param {number} index
 * @param {any[]} array
 * @returns {any}
 */

// minifiable alias
const p = Promise

/**
 * @param {Array<any>} iterable a collection or array of items to be mapped over
 * @param {MapFunction} mapFunc the async function that is to be run per item of the collection
 * @param {Options} options configuration options for conch
 * @returns {Promise<any>}
 */
export const conch = (iterable, mapFunc, options = {limit: Infinity}) => {
	return new p((resolve, reject) => {
		let result = []
		const limit = options.limit

		// Check for limit to be a valid number and not less that 1
		if (isNaN(limit) || limit < 1) {
			throw new Error(
				'Invalid number returned for limit, make sure its a number and is greater than 1',
			)
		}

		// store the total number of chunks to be created for the provided limit
		let totalChunks = 1

		if (limit >= 1 && limit !== Infinity) {
			totalChunks = Math.ceil(iterable.length / limit)
		}

		const chain = p.resolve()

		for (let i = 0; i < totalChunks; i++) {
			const batch = iterable.slice(i * limit, (i + 1) * limit)
			chain
				.then(() => p.all(batch.map(mapFunc)))
				.then(data => {
					result.concat(data)
				})
				.catch(reject)
		}

		chain.then(_ => resolve(result))
	})
}
