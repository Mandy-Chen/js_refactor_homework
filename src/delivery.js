function deliveryDate(anOrder, isRush) {
  if (isRush) {
    return isRushDeliveryDate(anOrder);
  } else {
    return isNotRushDeliveryDate(anOrder);
  }
}

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
  IsIncludeMACT(anOrder)?deliveryTime = 1:(IsIncludeNYNH(anOrder)?deliveryTime = 2:deliveryTime = 3)
  return anOrder.placedOn.plusDays(1 + deliveryTime);
}

function IsIncludeNYNH(anOrder) {
  return [
    'NY',
    'NH',
  ].includes(anOrder.deliveryState);
}

function IsIncludeMACT(anOrder) {
  return [
    'MA',
    'CT',
  ].includes(anOrder.deliveryState);
}

module.exports = {
  deliveryDate,
};