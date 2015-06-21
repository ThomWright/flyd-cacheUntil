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

    [1, 2, 3, 4, 5]
      .forEach(n => stream(n));

    flyd.on(x => {
      expect(x).to.deep.equal([1, 2, 3, 4, 5]);
    }, cachedStream);

    trigger('something');
  });

  it('should cache before the trigger is specified', () => {
    const stream = flyd.stream();
    const caching = cache(stream);

    [1, 2, 3, 4, 5]
      .forEach(n => stream(n));

    const trigger = flyd.stream();
    const cachedStream = caching.until(trigger);

    flyd.on(x => {
      expect(x).to.deep.equal([1, 2, 3, 4, 5]);
    }, cachedStream);

    trigger('something');
  });

  it('should empty the cache after being triggered', () => {
    const stream = flyd.stream();
    const trigger = flyd.stream();
    const cachedStream = cache(stream).until(trigger);

    [1, 2, 3, 4, 5]
      .forEach(n => stream(n));

    trigger('something');

    ['a', 'b', 'c', 'd', 'e']
      .forEach(n => stream(n));

    trigger('something');

    flyd.on(x => {
      expect(x).to.deep.equal(['a', 'b', 'c', 'd', 'e']);
    }, cachedStream);
  });
});
