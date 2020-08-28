const deliveryTest = require('ava');
const { deliveryDate } = require('../src/delivery');

deliveryTest('deliveryState includes MA and isRush is true', t => {
    const anOrder = {
        deliveryState:'MA',
        placedOn: {
            plusDays: function (day) {
                return day;
            }
        }
    };
    const isRush = true;
    const result = deliveryDate(anOrder,isRush);
    t.is(result,2);
})