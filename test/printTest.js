const printTest = require('ava');
const { printOwing } = require("../src/print")

printTest('Should return result when printOwing given invoice', t => {
    const invoice = {
        "customer": "mandy",
        "borderSpacing": [
            {amount:6},
            {amount:9}
        ]
    };
    let today = new Date();
    let plusDay = new Date();
    plusDay.setDate(today.getDate() + 30)
    const result = printOwing(invoice);
    t.is(result, '***********************\n' +
        '**** Customer Owes ****\n' +
        '***********************\n' +
        'name: mandy\n'+
        'amount: 15\n' +
        'amount: '+plusDay.toLocaleDateString()+'\n')

});