const rankTest = require('ava');
const { voyageRisk, rating } = require('../src/rank');
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
rankTest('voyage.length>4 and voyage.zone not includes china or east-indies', t => {
  const voyage = {
    zone: 'test',
    length: 5,
  };
  const result = voyageRisk(voyage);
  t.is(result, 3);
})
rankTest('voyage.length>4 and voyage.zone  includes china ', t => {
  const voyage = {
    zone: 'china',
    length: 5,
  };
  const result = voyageRisk(voyage);
  t.is(result, 7);
})
rankTest('voyage.length<=4 and voyage.zone includes china ', t => {
  const voyage = {
    zone: 'china',
    length: 4,
  };
  const result = voyageRisk(voyage);
  t.is(result, 5);
})
rankTest('voyage.length>8 and voyage.zone includes china ', t => {
  const voyage = {
    zone: 'china',
    length: 9,
  };
  const result = voyageRisk(voyage);
  t.is(result, 8);
})
rankTest('voyage.length>8 and voyage.zone not includes china ', t => {
  const voyage = {
    zone: 'test',
    length: 9,
  };
  const result = voyageRisk(voyage);
  t.is(result, 4);
})