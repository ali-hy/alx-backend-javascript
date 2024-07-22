export default function createIteratorObject(report) {
  const allEmployees = report.allEmployees;
  let employees = [];

  for (const department of Object.values(allEmployees)) {
    employees = employees.concat(department);
  }

  return employeesSymbol.iterator;
}
