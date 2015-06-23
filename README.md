flyd-cacheUntil
===============

[![Travis](https://img.shields.io/travis/ThomWright/flyd-cacheUntil.svg?style=flat-square)](https://travis-ci.org/ThomWright/flyd-cacheUntil)
[![npm](https://img.shields.io/npm/v/flyd-cacheuntil.svg?style=flat-square)](https://www.npmjs.com/package/flyd-cacheuntil)
[![David](https://img.shields.io/david/ThomWright/flyd-cacheUntil.svg?style=flat-square)](https://david-dm.org/ThomWright/flyd-cacheUntil)
[![David](https://img.shields.io/david/dev/ThomWright/flyd-cacheUntil.svg?style=flat-square)](https://david-dm.org/ThomWright/flyd-cacheUntil#info=devDependencies)

Cache a stream's output until triggered by another stream. Returns an [Immutable.List](https://facebook.github.io/immutable-js/docs/#/List) of cached values.

**Signature**

`Stream<E> -> Stream -> Stream<List<E>>`

**Usage**

```javascript
import flyd from 'flyd';
import cache from 'flyd-cacheuntil';

const stream = flyd.stream();
const trigger = flyd.stream();
const cachedStream = cache(stream).until(trigger);

flyd.on(x => {
  console.log('Output:', x.toJS());
}, cachedStream);

stream(1)(2)(3)(4)(5);
trigger(true);

stream('a')('b')('c')('d')('e');
trigger(true);

// Output: List [ 1, 2, 3, 4, 5 ]
// Output: List [ "a", "b", "c", "d", "e" ]
```
