# conch

> micro library for async sequential batches (Node/Browser/Deno)

 <p>
 <img alt="GitHub" src="https://img.shields.io/github/license/barelyhuman/conch?logoColor=000&colorA=000000&colorB=000000">
<a href="https://bundlephobia.com/result?p=@barelyreaper/conch"><img src="https://img.shields.io/bundlephobia/minzip/@barelyreaper/conch?label=bundle%20size&amp;style=flat&amp;colorA=000000&amp;colorB=000000" alt="Build Size"></a>
 <a href="https://www.npmjs.com/package/@barelyreaper/conch"><img src="https://img.shields.io/npm/v/@barelyreaper/conch?style=flat&amp;colorA=000000&amp;colorB=000000" alt="Version"></a>
 <a href="https://www.npmjs.com/package/@barelyreaper/conch"><img src="https://img.shields.io/npm/dt/@barelyreaper/conch.svg?style=flat&amp;colorA=000000&amp;colorB=000000" alt="Downloads"></a>
 </p>

[The Why &rarr;](/docs/where-to-use.md)

## Install

#### Node

```sh
npm i @barelyreaper/conch
# or
yarn add @barelyreaper/conch
```

#### Deno

```js
import {conch} from 'https://cdn.skypack.dev/@barelyreaper/conch';
// or
import {conch} from "https://www.unpkg.com/@barelyreaper/conch/dist/index.mjs
```

## Usage

```js
const {conch} = require('@barelyreaper/conch')

const data = [
	{
		item: 1,
	},
	{
		item: 2,
	},
	{
		item: 3,
	},
]

function getData(item) {
	return new Promise(resolve => {
		setTimeout(() => {
			resolve(item)
		}, 2500)
	})
}

// Will take 3 * 2500 , considering there's 3 items and only one can run at once (limit:1)
conch(data, getData, {limit: 1}).then(data => {
	console.log({data})
})
```

## Build

```sh
yarn # install devDeps
yarn test # check the if the limit is being taken in consideration
yarn build # build the package
```

## Benchmark

conch has the lowest amount of allocation to usage ratio out of the 3

```
┌──────────┬────────────────────┬────────────────────┐
│ Name     │ Used               │ Allocated          │
├──────────┼────────────────────┼────────────────────┤
│ conch    │ 4.69 MB            │ 4.95 MB            │
├──────────┼────────────────────┼────────────────────┤
│ p-map    │ 4.6 MB             │ 6.01 MB            │
├──────────┼────────────────────┼────────────────────┤
│ bluebird │ 5.99 MB            │ 7.31 MB            │
└──────────┴────────────────────┴────────────────────┘
```
