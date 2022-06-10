import { test } from 'uvu'
import * as assert from 'uvu/assert'

const batchingLogic = (items = [], limit = 2) => {
  const batches = []

  const batcher = (_till = 0) => {
    const nextTill = _till + 1 + (limit - 1)

    const batch = items.slice(_till, nextTill)

    if (batch.length === 0) return batches

    batches.push(batch)

    return batcher(nextTill)
  }

  return batcher()
}

const data = Array.from(Array(10).keys())

test('batch | limit 1', async () => {
  const batches = batchingLogic(data, 1)
  assert.equal(batches.length, data.length)
})

test('batch | limit 2', async () => {
  const batches = batchingLogic(data, 2)
  assert.equal(batches.length, data.length / 2)
})

test('batch | limit 3', async () => {
  const batches = batchingLogic(data, 3)
  assert.equal(batches.length, Math.ceil(data.length / 3))
})

test('batch | limit 4', async () => {
  const batches = batchingLogic(data, 4)
  assert.equal(batches.length, Math.ceil(data.length / 4))
})

test('batch | limit 5', async () => {
  const batches = batchingLogic(data, 5)
  assert.equal(batches.length, Math.ceil(data.length / 5))
})

test.run()
