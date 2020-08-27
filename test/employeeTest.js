const employeeTest = require('ava');
const { Employee } = require('../src/employee');

employeeTest('type is engineer', t => {
    let employee = new Employee('mandy', 'engineer');
    const result = employee.toString();
    t.is(result, 'mandy (engineer)');
})