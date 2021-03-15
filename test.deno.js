import conch from './dist/index.esm.js'

const data = [
  {
    item: 1
  },
  {
    item: 2
  },
  {
    item: 3
  }
]

function getData (item) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(item)
    }, 2500)
  })
}

// Should take 3 * 2500ms approx
console.time('conc limit')
conch(data, getData, { limit: 1 }).then((data) => {
  console.timeEnd('conc limit')
  console.log({ data })
})

// Should take 2500ms approx
console.time('conc')
conch(data, getData).then((data) => {
  console.timeEnd('conc')
  console.log({ data })
})
