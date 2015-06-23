import sampleOn from 'flyd-sampleon';
import scanMerge from 'flyd-scanmerge';
import Immutable from 'immutable';

export default function(inputStream) {

  return {
    until: (trigger) => {
      return sampleOn(trigger,
        scanMerge([
          [inputStream, (cache, e) => {
            return cache.push(e);
          }],

          [trigger, () => {
            return new Immutable.List();
          }]
        ],
        new Immutable.List()
        )
      );
    }
  };
}
