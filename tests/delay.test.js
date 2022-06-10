import { test } from 'uvu'
import * as assert from 'uvu/assert'

import { conch } from '../src/index.js'

const data = [
  {
    item: 1,
  },
  {
    item: 2,
  },
  {
    item: 3,
  },
]

function getData(item) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(item)
    }, 2500)
  })
}

test('conch | limit 1', async () => {
  const now = Date.now()
  const result = await conch(data, getData, { limit: 1 })
  const end = Date.now()
  const diff = end - now
  const baseMS = 2500 * 3
  assert.ok(diff >= baseMS && diff <= baseMS + 100)
  assert.equal(result, data)
})

test('conch | no limit', async () => {
  const now = Date.now()
  const result = await conch(data, getData)
  const end = Date.now()
  const diff = end - now
  assert.ok(diff >= 2500 && diff <= 2600)
  assert.equal(result, data)
})

test.run()
