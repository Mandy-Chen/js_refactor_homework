function voyageRisk(voyage) {
  let result = 1;
  if (voyage.length > 4) {
    result += 2;
  }
  if (voyage.length > 8) {
    result += voyage.length - 8;
  }
  const voyageZoneOfChinaAndEast = [
    'china',
    'east-indies',
  ];
  if (voyageZoneOfChinaAndEast.includes(voyage.zone)) {
    result += 4;
  }
  return Math.max(result, 0);
}

function hasChina(history) {
  return history.some(voyage => 'china' === voyage.zone);
}

function captainHistoryRisk(voyage, history) {
  let result = 1;
  if (history.length < 5) {
    result += 4;
  }
  result += history.filter(voyage => voyage.profit < 0).length;
  if (IsChinaAndHasChina(voyage, history)) {
    result -= 2;
  }
  return Math.max(result, 0);
}

function IsChinaAndHasChina(voyage, history) {
  return voyage.zone === 'china' && hasChina(history);
}

function voyageProfitFactor(voyage, history) {
  let result = 2;
  if (voyage.zone === 'china' || voyage.zone === 'east-indies') {
    result += 1;
  }

  if (IsChinaAndHasChina(voyage, history)) {
    result += zoneIsChinaAndHasChina(history, voyage);
  }
  else {
    result += NotHasChina(history, voyage);
  }
  return result;
}

function NotHasChina(history, voyage) {
  let result = 0;
  if (history.length > 8) {
    result += 1;
  }
  if (voyage.length > 14) {
    result -= 1;
  }
  return result;
}

function zoneIsChinaAndHasChina(history, voyage) {
  let result = 3;
  if (history.length > 10) {
    result += 1;
  }
  if (voyage.length > 12) {
    result += 1;
  }
  if (voyage.length > 18) {
    result -= 1;
  }
  return result;
}

function rating(voyage, history) {
  const vpf = voyageProfitFactor(voyage, history);
  const vr = voyageRisk(voyage);
  const chr = captainHistoryRisk(voyage, history);
  let result = "";
  (vpf * 3 > (vr + chr * 2))?result = 'A':result = 'B';
  return result;
}

module.exports = {
  voyageRisk,
  captainHistoryRisk,
  voyageProfitFactor,
  rating
};

const voyage = {
  zone: 'west-indies',
  length: 10,
};
const history = [
  {
    zone: 'east-indies',
    profit: 5,
  }, {
    zone: 'west-indies',
    profit: 15,
  }, {
    zone: 'china',
    profit: -2,
  },
  {
    zone: 'west-africa',
    profit: 7,
  },
];
const myRating = rating(voyage, history);
console.log(`myRating: ${myRating}`);
