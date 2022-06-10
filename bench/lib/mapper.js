export function mapperFunc(item) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(item)
    }, 2500)
  })
}
