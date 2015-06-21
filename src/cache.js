import flyd from 'flyd';

export default function(stream) {
  let cache = [];

  flyd.on((x) => {
    cache.push(x);
  }, stream);

  return {
    until: (trigger) => {
      const outputStream = flyd.stream();
      flyd.on(() => {
        outputStream(cache);
        cache = [];
      }, trigger);
      return outputStream;
    }
  };
}
