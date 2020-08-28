function deliveryDate(anOrder, isRush) {
  if (isRush) {
    return isRushDeliveryDate(anOrder);
  } else {
    return isNotRushDeliveryDate(anOrder);
  }
}
module.exports = {
  deliveryDate,
};
function isNotRushDeliveryDate(anOrder) {
  let deliveryTime;
  IsIncludeMACTNY(anOrder) ? deliveryTime = 2 : (IsIncludeMENH(anOrder) ? deliveryTime = 3 : deliveryTime = 4)
  return anOrder.placedOn.plusDays(2 + deliveryTime);
}

function IsIncludeMENH(anOrder) {
  return [
    'ME',
    'NH',
  ].includes(anOrder.deliveryState);
}

function IsIncludeMACTNY(anOrder) {
  return [
    'MA',
    'CT',
    'NY',
  ].includes(anOrder.deliveryState);
}

function isRushDeliveryDate(anOrder) {
  let deliveryTime;
  if (IsIncludeMACT(anOrder)) {
    deliveryTime = 1;
  }
  else if ([
    'NY',
    'NH',
  ].includes(anOrder.deliveryState)) {
    deliveryTime = 2;
  }
  else {
    deliveryTime = 3;
  }
  return anOrder.placedOn.plusDays(1 + deliveryTime);
}

function IsIncludeMACT(anOrder) {
  return [
    'MA',
    'CT',
  ].includes(anOrder.deliveryState);
}

