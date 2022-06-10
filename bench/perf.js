import Bench from 'benchmark'
import bluebird from 'bluebird'
import pMap from 'p-map'
import promisu from 'promisu'

import { conch } from '../dist/index.mjs'

const suite = new Bench.Suite()

const data = Array.from(Array(30).keys())

const mapper = async item => {
  return item * 2
}

suite
  .add('conch', function () {
    conch(data, mapper, { limit: 5 }).then(() => {})
  })
  .add('p-map', function () {
    pMap(data, mapper, { concurrency: 5 }).then(() => {})
  })
  .add('promisu', function () {
    promisu.PromisuMap(data, mapper, { concurrency: 5 }).then(() => {})
  })
  // .add('bluebird', function () {
  //   bluebird.map(data, mapper, { concurrency: 5 })
  // })
  .on('cycle', e => console.log('  ' + e.target))
  .on('complete', function () {
    console.log('Fastest :' + this.filter('fastest').map('name'))
    console.log('Slowest :' + this.filter('slowest').map('name'))
  })
  .run({ async: true })
