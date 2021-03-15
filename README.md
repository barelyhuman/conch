<p align="center">
  <img src="public/logo.svg" />
</p>

# conch

micro library for batch running promises (Node/Browser/Deno)

**Note: This is not a promise map alternative, promise map runs promises in parallel while keeping the given concurrency intact after every successful resolve, this runs it in sequential batches**

For low powered/memory systems and browsers it's sometimes impossible to run all the promises at once and it's easier to run it in batches one after the other, this helper basically does that. It chains the batches in a dependency chain and waits for the first batch to finish before executing the next.This can be controlled by the `limit` option, by providing the number of promises that a single batch will have.

## Install

#### Node

```sh
npm i @barelyreaper/conch
# or
yarn add @barelyreaper/conch
```

#### Deno

```js
import conch from 'https://cdn.skypack.dev/@barelyreaper/conch';
// or 
import conch from "https://www.unpkg.com/@barelyreaper/conch/dist/index.esm.js
```

## Usage

```js
const conch = require('@barelyreaper/conch');

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
];

function getData(item) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(item);
    }, 2500);
  });
}

// Will take 3 * 2500 , considering there's 3 items and only one can run at once (limit:1)
conch(data, getData, { limit: 1 }).then((data) => {
  console.log({ data });
});
```

## Build

```sh
yarn # install devDeps
yarn test # check the if the limit is being taken in consideration
yarn build # build the package
```

## Contribute

You are free to fork,fix or create your own version

- Fork
- Pick and Issue, inform in the issue comments to avoid overlaps
- Code
- Raise a PR
- Merge / Feedback Cycle

<hr />

<a href="https://www.freepik.com/vectors/icons">Logo vector created by lyolya_profitrolya - www.freepik.com</a>
