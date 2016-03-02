import sampleOn from 'flyd-sampleon';
import scanMerge from 'flyd-scanmerge';

const cacheUntil = (trigger, inputStream) => {
  return sampleOn(trigger,
    scanMerge([
      [inputStream, (cache, e) => {
        return [
          ...cache,
          e
        ];
      }],

      [trigger, () => {
        return [];
      }]
    ],
    []
    )
  );
};

export default function(a, b) {
  if (b) {
    const trigger = a, // having trigger first gives a better API for currying
          inputStream = b;
    return cacheUntil(trigger, inputStream);
  } else {
    const inputStream = a;
    return {
      until: (trigger) => {
        return cacheUntil(trigger, inputStream);
      }
    };
  }
}
