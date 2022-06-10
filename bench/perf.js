import Bench from 'benchmark'
import bluebird from 'bluebird'
import pMap from 'p-map'

import { conch } from '../dist/index.mjs'

const suite = new Bench.Suite()

const data = Array.from(Array(15).keys())

const mapper = async item => {
  return item * 2
}

suite
  .add('conch', function () {
    conch(data, mapper, { limit: 5 })
  })
  .add('pMap', function () {
    pMap(data, mapper, { concurrency: 5 })
  })
  .add('bluebird', function () {
    bluebird.map(data, mapper, { concurrency: 5 })
  })
  .on('cycle', e => console.log('  ' + e.target))
  .on('complete', function () {
    console.log('Fastest is ' + this.filter('fastest').map('name'))
  })
  .run({ async: true })
