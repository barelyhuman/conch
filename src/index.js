'use strict'

async function conc (iterable, mapFunc, options = { limit: Infinity }) {
  return new Promise((resolve, reject) => {
    let result = []
    const iterator = [...iterable]

    // Check for limit to be a valid number and not less that 1
    if (isNaN(options.limit) || options.limit < 1) {
      throw new Error(
        'Invalid number returned for limit, make sure its a number and is greater than 1'
      )
    }

    // store the total number of chunks to be created for the provided limit
    let totalChunks = 1

    if (options.limit >= 1 && options.limit != Infinity) {
      totalChunks = Math.ceil(iterator.length / options.limit)
    }

    // Create an array out of the total batches
    [...Array(totalChunks).keys()]
      // go through each item while slicing it into batches and processing a single batch
      // then create a promise chain resolving one batch after the other
      .reduce((acc, _, index) => {
        const batch = iterator.slice(
          index * options.limit,
          (index + 1) * options.limit
        )

        return acc
          .then(() => Promise.all(batch.map(mapFunc)))
          .then((data) => {
            result = result.concat(data)
          })
          .catch(reject)
      }, Promise.resolve())
      // return the completed result
      .then((_) => resolve(result))
  })
}

module.exports = conc
