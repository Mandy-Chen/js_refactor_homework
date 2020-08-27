const rankTest = require('ava');
const { voyageRisk,rating } = require('../src/rank');
// rankTest('foo', t => {
//   t.pass();
// });

// rankTest('bar', async t => {
//   const bar = Promise.resolve('bar');
//   t.is(await bar, 'bar');
// });

rankTest('voyage.length<=4 and voyage.zone not includes china or east-indies', t => {
  const voyage = {
    zone: 'test',
    length: 4,
  };

  const result = voyageRisk(voyage);
  t.is(result, 1);
})