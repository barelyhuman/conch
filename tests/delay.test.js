const conch = require("../src/index").default;
const { test } = require("uvu");
const assert = require("uvu/assert");

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

test("conch | limit 1", async () => {
  let now = Date.now();
  await conch(data, getData, { limit: 1 });
  let end = Date.now();
  const diff = end - now;
  const baseMS = 2500 * 3;
  assert.ok(diff >= baseMS || diff <= baseMS + 100);
});

test("conch | no limit", async () => {
  let now = Date.now();
  await conch(data, getData);
  let end = Date.now();
  const diff = end - now;
  assert.ok(diff >= 2500 || diff <= 2600);
});

test.run();
