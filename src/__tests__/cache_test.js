/*global describe*/
/*global it*/
/*global expect*/

import flyd from 'flyd';
import cache from '../cache.js';

describe('connect', () => {
  it('should cache values until triggered', () => {
    const stream = flyd.stream();
    const trigger = flyd.stream();
    const cachedStream = cache(stream).until(trigger);

    stream(1)(2)(3)(4)(5);

    flyd.on(x => {
      expect(x).to.deep.equal([1, 2, 3, 4, 5]);
    }, cachedStream);

    trigger(true);
  });

  it('should empty the cache after being triggered', () => {
    const stream = flyd.stream();
    const trigger = flyd.stream();
    const cachedStream = cache(stream).until(trigger);

    stream(1)(2)(3)(4)(5);
    trigger(true);

    stream('a')('b')('c')('d')('e');
    trigger(true);

    flyd.on(x => {
      expect(x).to.deep.equal(['a', 'b', 'c', 'd', 'e']);
    }, cachedStream);
  });

  it('should have a more functional API', () => {
    const cacheUntil = cache;
    const stream = flyd.stream();
    const trigger = flyd.stream();
    const cachedStream = cacheUntil(trigger, stream);

    stream(1)(2)(3)(4)(5);

    flyd.on(x => {
      expect(x).to.deep.equal([1, 2, 3, 4, 5]);
    }, cachedStream);

    trigger(true);
  });
});
