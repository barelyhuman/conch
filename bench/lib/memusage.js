import process from 'node:process'
import pb from 'pretty-bytes'

export async function memUsage(func) {
  await func
  console.log(
    JSON.stringify({
      totalUsed: pb(process.memoryUsage().heapUsed),
      totalAllocated: pb(process.memoryUsage().heapTotal),
    })
  )
}
