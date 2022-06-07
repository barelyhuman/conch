import pMap from 'p-map'
import {countryList} from './lib/dataset.js'
import {mapperFunc} from './lib/mapper.js'
import {memUsage} from './lib/memusage.js'

memUsage(pMap(countryList, mapperFunc, {concurrency: 100}))
