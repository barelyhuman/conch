## Why ?

This was written for low memory systems where it'd be expensive to follow a [windowed resolving approach](#windowed) and instead follows a [batch resolving one](#batches)

## Where to use it?

You can actually use it wherever you'd use any promise.map function but know that this is slower than promise.map approaches and it to be used only where process completion and memory is more important than time.

If speed is what you are looking for , then bluebird's map is your best option right now

## Windowed

A windowed approach is basically how most Promise map alternatives on the web work with.
They maintain a set amount of promises in the window at all times.

Eg:

```
[1,2,3] 4,5,6,7,8,9,10
```

If one of the first 3 promises get's resolved, then window would like so

```
2 [1,3,4] 5,6,7,8,9,10
```

Where, `2` just got resolved and the next item is added to the window, thus giving you a performance boost, though this also means that the memory usage of something like this is slightly higher when working with IO and so the next simple implementation is to run these promises one by one.

## Batches

Another approach that takes a middle ground is batching. Which is similar to the above approach but instead of keeping the window filled at all times, it does so by waiting for all promises in the batch to complete before moving to the next one.

Eg: same example

```
[1,2,3] 4,5,6,7,8,9,10
```

But in this case, it won't just move to the next promise but wait for `1,2,3` to resolve before moving to `4,5,6`.

**But that's slower!!**
Yes, it's slower than the windowed approach and it's meant to be, we are giving up time for memory because let's say you are working with a old Raspeberry Pi.

My personal Pi couldn't spend more than 30mb for a RW operation that was required to process my logs files into a pipe and the initial approach was to use `promise.map` from the bluebird library, ended into a memory fault, tried a lighter library [p-map](https://github.com/sindresorhus/p-map) which has saved me from such situations quite a few times but ended up with the same on anymore than 2 items in the window.

So yes ,map did work but I wanted to see if it can handle a little more and wrote a toy version of this package, added a limit of 2 to start with, worked as expected.

Turned it up to 4, to see if it'd fail, and it went through no issues.

Turned it up to 5 and was greeted by a memory fault so left it at 4 and that's slightly better than 2 but definitely something that was better than 2.
