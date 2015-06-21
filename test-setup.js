var chai = require('chai');
global.expect = chai.expect;

chai.config.includeStack = true;

require('babel/register')({
  optional: [
    'es7.objectRestSpread',
    'runtime'
  ]
});
