const rankTest = require('ava');
const { voyageRisk,captainHistoryRisk, voyageProfitFactor,rating } = require('../src/rank');
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

rankTest('history.length<5 and voyage.zone not china and history not include china', t => {
  const voyage = {
    zone: 'test',
    length: 9,
  };
  const history = [
    {
      zone: 'east-indies',
      profit: 5,
    },{
      zone: 'west-indies',
      profit: 15,
    },
    {
      zone: 'west-africa',
      profit: 7,
    },
  ];
  const result = captainHistoryRisk(voyage,history);
  const resultRating=rating(voyage,history);
  t.is(result, 5);
  t.is(resultRating, 'B');
})

rankTest('history.length>=5 and voyage.zone not china and history not include china', t => {
  const voyage = {
    zone: 'test',
    length: 9,
  };
  const history = [
    {
      zone: 'east-indies',
      profit: 5,
    },{
      zone: 'west-indies',
      profit: 15,
    },
    {
      zone: 'west-africa',
      profit: 7,
    },
    {
      zone: 'test1',
      profit: 15,
    },
    {
      zone: 'test2',
      profit: 7,
    },
  ];
  const result = captainHistoryRisk(voyage,history);
  t.is(result, 1);
  const resultRating=rating(voyage,history);
  t.is(resultRating, 'B');
})

rankTest('history.length<5 and voyage.zone is china and history include china', t => {
  const voyage = {
    zone: 'china',
    length: 4,
  };
  const history = [
    {
      zone: 'east-indies',
      profit: 5,
    },{
      zone: 'west-indies',
      profit: 15,
    },
    {
      zone: 'china',
      profit: 7,
    },
  ];
  const result = captainHistoryRisk(voyage,history);
  t.is(result, 3);
  const resultRating=rating(voyage,history);
  t.is(resultRating, 'A');
})

rankTest('history.length>=5 and voyage.zone is china and history include china', t => {
  const voyage = {
    zone: 'china',
    length: 9,
  };
  const history = [
    {
      zone: 'east-indies',
      profit: 5,
    },{
      zone: 'west-indies',
      profit: 15,
    },
    {
      zone: 'west-africa',
      profit: 7,
    },
    {
      zone: 'china',
      profit: 15,
    },
    {
      zone: 'test2',
      profit: 7,
    },
  ];
  const result = captainHistoryRisk(voyage,history);
  t.is(result, 0);
  const resultRating=rating(voyage,history);
  t.is(resultRating, 'A');
})

rankTest('voyage.zone is china ,and history not include china and history.length<=8 and voyage.length<=14', t => {
  const voyage = {
    zone: 'china',
    length: 14,
  };
  const history = [
    {
      zone: 'east-indies',
      profit: 5,
    },{
      zone: 'west-indies',
      profit: 15,
    },
    {
      zone: 'test',
      profit: 7,
    },
  ];
  const result = voyageProfitFactor(voyage,history);
  t.is(result, 3);
  const resultRating=rating(voyage,history);
  t.is(resultRating, 'B');
})

rankTest('voyage.zone not china ,and history not include china and history.length<=8 and voyage.length<=14', t => {
  const voyage = {
    zone: 'test',
    length: 14,
  };
  const history = [
    {
      zone: 'east-indies',
      profit: 5,
    },{
      zone: 'west-indies',
      profit: 15,
    },
    {
      zone: 'test',
      profit: 7,
    },
  ];
  const result = voyageProfitFactor(voyage,history);
  t.is(result, 2);
  const resultRating=rating(voyage,history);
  t.is(resultRating, 'B');
})

rankTest('voyage.zone not china and history.length>8 and voyage.length<=14', t => {
  const voyage = {
    zone: 'test',
    length: 14,
  };
  const history = [
    {
      zone: 'east-indies',
      profit: 5,
    },{
      zone: 'west-indies',
      profit: 15,
    },
    {
      zone: 'test',
      profit: 7,
    },{
      zone: 'west-indies',
      profit: 15,
    },
    {
      zone: 'test',
      profit: 7,
    },{
      zone: 'west-indies',
      profit: 15,
    },
    {
      zone: 'test',
      profit: 7,
    },{
      zone: 'west-indies',
      profit: 15,
    },
    {
      zone: 'test',
      profit: 7,
    },
  ];
  const result = voyageProfitFactor(voyage,history);
  t.is(result, 3);
  const resultRating=rating(voyage,history);
  t.is(resultRating, 'B');
})
rankTest('voyage.zone not china and history.length>8 and voyage.length>14', t => {
  const voyage = {
    zone: 'test',
    length: 15,
  };
  const history = [
    {
      zone: 'east-indies',
      profit: 5,
    },{
      zone: 'west-indies',
      profit: 15,
    },
    {
      zone: 'test',
      profit: 7,
    },{
      zone: 'west-indies',
      profit: 15,
    },
    {
      zone: 'test',
      profit: 7,
    },{
      zone: 'west-indies',
      profit: 15,
    },
    {
      zone: 'test',
      profit: 7,
    },{
      zone: 'west-indies',
      profit: 15,
    },
    {
      zone: 'test',
      profit: 7,
    },
  ];
  const result = voyageProfitFactor(voyage,history);
  t.is(result, 2);
  const resultRating=rating(voyage,history);
  t.is(resultRating, 'B');
})
rankTest('voyage.zone is china ,and history include china and history.length<=8 and voyage.length<=14', t => {
  const voyage = {
    zone: 'china',
    length: 14,
  };
  const history = [
    {
      zone: 'east-indies',
      profit: 5,
    },{
      zone: 'west-indies',
      profit: 15,
    },
    {
      zone: 'china',
      profit: 7,
    },
  ];
  const result = voyageProfitFactor(voyage,history);
  t.is(result, 7);
  const resultRating=rating(voyage,history);
  t.is(resultRating, 'A');
})
rankTest('voyage.zone is china ,and history include china and history.length>8 and voyage.length<=14', t => {
  const voyage = {
    zone: 'china',
    length: 14,
  };
  const history = [
    {
      zone: 'east-indies',
      profit: 5,
    },{
      zone: 'west-indies',
      profit: 15,
    },
    {
      zone: 'china',
      profit: 7,
    },{
      zone: 'west-indies',
      profit: 15,
    },
    {
      zone: 'china',
      profit: 7,
    },{
      zone: 'west-indies',
      profit: 15,
    },
    {
      zone: 'china',
      profit: 7,
    },{
      zone: 'west-indies',
      profit: 15,
    },
    {
      zone: 'china',
      profit: 7,
    },
  ];
  const result = voyageProfitFactor(voyage,history);
  t.is(result, 7);
  const resultRating=rating(voyage,history);
  t.is(resultRating, 'A');
})
rankTest('voyage.zone is china ,and history include china and history.length>8 and voyage.length>14', t => {
  const voyage = {
    zone: 'china',
    length: 15,
  };
  const history = [
    {
      zone: 'east-indies',
      profit: 5,
    },{
      zone: 'west-indies',
      profit: 15,
    },
    {
      zone: 'china',
      profit: 7,
    },{
      zone: 'west-indies',
      profit: 15,
    },
    {
      zone: 'china',
      profit: 7,
    },{
      zone: 'west-indies',
      profit: 15,
    },
    {
      zone: 'china',
      profit: 7,
    },{
      zone: 'west-indies',
      profit: 15,
    },
    {
      zone: 'china',
      profit: 7,
    },
  ];
  const result = voyageProfitFactor(voyage,history);
  t.is(result, 7);
  const resultRating=rating(voyage,history);
  t.is(resultRating, 'A');
})

rankTest('voyage.zone is east-indies and history.length<=8 and voyage.length<=14', t => {
  const voyage = {
    zone: 'east-indies',
    length: 14,
  };
  const history = [
    {
      zone: 'east-indies',
      profit: 5,
    },{
      zone: 'west-indies',
      profit: 15,
    },
    {
      zone: 'china',
      profit: 7,
    },{
      zone: 'west-indies',
      profit: 15,
    },
    {
      zone: 'china',
      profit: 7,
    },{
      zone: 'west-indies',
      profit: 15,
    },
    {
      zone: 'china',
      profit: 7,
    },{
      zone: 'west-indies',
      profit: 15,
    },
    
  ];
  const result = voyageProfitFactor(voyage,history);
  t.is(result, 3);
  const resultRating=rating(voyage,history);
  t.is(resultRating, 'B');
})

rankTest('voyage.zone is east-indies and history.length>8 and voyage.length<=14', t => {
  const voyage = {
    zone: 'east-indies',
    length: 14,
  };
  const history = [
    {
      zone: 'east-indies',
      profit: 5,
    },{
      zone: 'west-indies',
      profit: 15,
    },
    {
      zone: 'china',
      profit: 7,
    },{
      zone: 'west-indies',
      profit: 15,
    },
    {
      zone: 'china',
      profit: 7,
    },{
      zone: 'west-indies',
      profit: 15,
    },
    {
      zone: 'china',
      profit: 7,
    },{
      zone: 'west-indies',
      profit: 15,
    },
    {
      zone: 'west-indies',
      profit: 15,
    },
    
  ];
  const result = voyageProfitFactor(voyage,history);
  t.is(result, 4);
  const resultRating=rating(voyage,history);
  t.is(resultRating, 'B');
})
rankTest('voyage.zone is east-indies and history.length>8 and voyage.length>14', t => {
  const voyage = {
    zone: 'east-indies',
    length: 15,
  };
  const history = [
    {
      zone: 'east-indies',
      profit: 5,
    },{
      zone: 'west-indies',
      profit: 15,
    },
    {
      zone: 'china',
      profit: 7,
    },{
      zone: 'west-indies',
      profit: 15,
    },
    {
      zone: 'china',
      profit: 7,
    },{
      zone: 'west-indies',
      profit: 15,
    },
    {
      zone: 'china',
      profit: 7,
    },{
      zone: 'west-indies',
      profit: 15,
    },
    {
      zone: 'west-indies',
      profit: 15,
    },
    
  ];
  const result = voyageProfitFactor(voyage,history);
  t.is(result, 3);
  const resultRating=rating(voyage,history);
  t.is(resultRating, 'B');
})