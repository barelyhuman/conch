import { test } from 'uvu'
import * as assert from 'uvu/assert'

const batchingLogic = (items = [], limit = 2) => {
  const batches = []
  let offset = 0

  const batcher = () => {
    while (offset < items.length) {
      const batch = items.slice(offset * limit, (offset + 1) * limit)
      if (batch.length) batches.push(batch)
      offset = offset + 1
    }

    return batches
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
