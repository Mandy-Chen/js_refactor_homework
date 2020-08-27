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
employeeTest('type is test', t => {
    try {
        let employee = new Employee('mandy', 'test');
        employee.toString();
        t.fail();
    }
    catch (e) {
        t.is(e.message, 'Employee cannot be of type test');
    }
})