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

/**
 * @param {Array<unknown>} iterable a collection or array of items to be mapped over
 * @param {MapFunction} mapFunc the async function that is to be run per item of the collection
 * @param {Options} options configuration options for conch
 * @returns {Promise<unknown>}
 */
export const conch = async (
  iterable,
  mapFunc,
  options = { limit: Infinity }
) => {
  let resolved = []
  const limit = options.limit
  const maxTill = iterable.length

  const resolver = async (_till = 0) => {
    if (_till >= maxTill) return resolved

    let nextTill = maxTill
    if (!(limit === 0 || limit === Infinity)) nextTill = _till + 1 + (limit - 1)

    const batch = iterable.slice(_till, nextTill)

    if (batch.length === 0) return resolved

    const data = await Promise.all(batch.map(mapFunc))
    resolved = resolved.concat(data)

    return resolver(nextTill)
  }

  return resolver()
}
