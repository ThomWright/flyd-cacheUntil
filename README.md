flyd-cacheUntil
=================

[![Travis](https://img.shields.io/travis/ThomWright/flyd-cacheUntil.svg?style=flat-square)](https://travis-ci.org/ThomWright/flyd-cacheUntil)
[![npm](https://img.shields.io/npm/v/flyd-cacheuntil.svg?style=flat-square)](https://www.npmjs.com/package/flyd-cacheuntil)
[![David](https://img.shields.io/david/ThomWright/flyd-cacheUntil.svg?style=flat-square)](https://david-dm.org/ThomWright/flyd-cacheUntil)
[![David](https://img.shields.io/david/dev/ThomWright/flyd-cacheUntil.svg?style=flat-square)](https://david-dm.org/ThomWright/flyd-cacheUntil#info=devDependencies)

Cache a stream's output until triggered by another stream.

**Signature**

`Stream -> Stream -> Stream`

**Usage**

```javascript
import flyd from 'flyd';
import cache from 'flyd-cacheuntil';

const stream = flyd.stream();
const trigger = flyd.stream();
const cachedStream = cache(stream).until(trigger);

flyd.on(x => {
  console.log('Output', x);
}, cachedStream);

[1, 2, 3, 4, 5]
  .forEach(n => stream(n));

trigger('');

['a', 'b', 'c', 'd', 'e']
  .forEach(n => stream(n));

trigger('');

// Output [ 1, 2, 3, 4, 5 ]
// Output [ 'a', 'b', 'c', 'd', 'e' ]
```
