class Employee {
  constructor (name, type) {
    this.validateType(type)
    this._name = name;
    this._type = type;
  }

   validateType (type) {
    switch (type) {
      case "engineer":
        return engineerType();
      case "manager":
        return  salesmanType();
      case "salesman":
        return  managerType();
      default:
        throw new Error(`Employee cannot be of type ${type}`);
    }
  }
  
  toString () {
    return `${this._name} (${this._type})`;
  }
}
module.exports = {
  Employee,
};
function engineerType() {
    return "engineer";
}
function salesmanType() {
  return "salesman";
}
function managerType() {
  return "manager";
}
