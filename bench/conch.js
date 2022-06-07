import {conch} from '../dist/index.mjs'
import {countryList} from './lib/dataset.js'
import {mapperFunc} from './lib/mapper.js'
import {memUsage} from './lib/memusage.js'

memUsage(conch(countryList, mapperFunc, {limit: 100}))
