import bluebird from 'bluebird'

import { countryList } from './lib/dataset.js'
import { mapperFunc } from './lib/mapper.js'
import { memUsage } from './lib/memusage.js'

memUsage(bluebird.map(countryList, mapperFunc, { concurrency: 100 }))
