import Bench from 'benchmark'
import bluebird from 'bluebird'
import pMap from 'p-map'
import promisu from 'promisu'

import { conch } from '../dist/index.mjs'

const suite = new Bench.Suite()

const data = Array.from(Array(10).keys())

const mapper = async item => {
  return item * 2
}

suite
  .add('conch', function () {
    conch(data, mapper, { limit: data.length / 2 }).then(() => {})
  })
  .add('p-map', function () {
    pMap(data, mapper, { concurrency: data.length / 2 }).then(() => {})
  })
  .add('promisu', function () {
    promisu
      .PromisuMap(data, mapper, { concurrency: data.length / 2 })
      .then(() => {})
  })
  // .add('bluebird', function () {
  //   bluebird.map(data, mapper, { concurrency: data.length / 2 })
  // })
  .on('cycle', e => console.log('  ' + e.target))
  .on('complete', function () {
    console.log('Fastest :' + this.filter('fastest').map('name'))
    console.log('Slowest :' + this.filter('slowest').map('name'))
  })
  .run({ async: true })
