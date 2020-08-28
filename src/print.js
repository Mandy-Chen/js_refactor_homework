function printOwing(invoice) {
  let outstanding = calculateOutstanding(invoice);
  recordDueDate(invoice);
  let result = '***********************\n' +
    '**** Customer Owes ****\n' +
    '***********************\n' +
    `name: ${invoice.customer}\n` +
    `amount: ${outstanding}\n` +
    `amount: ${invoice.dueDate.toLocaleDateString()}\n`;
  console.log(result);
  return result;
}

module.exports = {
  printOwing,
};
function calculateOutstanding(invoice) {
  let outstanding = 0;
  for (const object of invoice.borderSpacing) {
    outstanding += object.amount;
  }
  return outstanding;
}

function recordDueDate(invoice) {
  const today = new Date();
  invoice.dueDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 30);
}

