import Table from 'cli-table'
import { execSync } from 'node:child_process'

const table = new Table({
  head: ['Name', 'Used', 'Allocated'],
  colWidths: [10, 20, 20],
})

pipeOut('conch   ', execSync('node conch.js'))
pipeOut('p-map   ', execSync('node pmap.js'))
pipeOut('bluebird', execSync('node bluebird.js'))

function pipeOut(name, output) {
  const usage = JSON.parse(output.toString())
  table.push([name, usage.totalUsed, usage.totalAllocated])
}

console.log(table.toString())
