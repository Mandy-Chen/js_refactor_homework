const employeeTest = require('ava');
const { Employee } = require('../src/employee');

employeeTest('type is engineer', t => {
    let employee = new Employee('mandy', 'engineer');
    const result = employee.toString();
    t.is(result, 'mandy (engineer)');
})
employeeTest('type is manager', t => {
    let employee = new Employee('mandy', 'manager');
    const result = employee.toString();
    t.is(result, 'mandy (manager)');
})
employeeTest('type is salesman', t => {
    let employee = new Employee('mandy', 'salesman');
    const result = employee.toString();
    t.is(result, 'mandy (salesman)');
})