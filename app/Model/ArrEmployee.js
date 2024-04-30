import Employee from './Employee';
class ArrEmployee {
  constructor() {
    this.employees = [
      new Employee('NV001', '123', 'Nguyen Van A', '123456789'),
      new Employee('NV002', '456', 'Tran Thi B', '987654321'),
      new Employee('NV003', '789', 'Le Thi C', '456123789'),
      //  new Employee('NV001', '123', 'Nguyen Van A', '123456789'),
      // new Employee('NV002', '456', 'Tran Thi B', '987654321'),
      // new Employee('NV003', '789', 'Le Thi C', '456123789'),
      //  new Employee('NV001', '123', 'Nguyen Van A', '123456789'),
      // new Employee('NV002', '456', 'Tran Thi B', '987654321'),
      // new Employee('NV003', '789', 'Le Thi C', '456123789'),
      //  new Employee('NV001', '123', 'Nguyen Van A', '123456789'),
      // new Employee('NV002', '456', 'Tran Thi B', '987654321'),
      // new Employee('NV003', '789', 'Le Thi C', '456123789'),
      //  new Employee('NV001', '123', 'Nguyen Van A', '123456789'),
      // new Employee('NV002', '456', 'Tran Thi B', '987654321'),
      // new Employee('NV003', '789', 'Le Thi C', '456123789'),
      //  new Employee('NV001', '123', 'Nguyen Van A', '123456789'),
      // new Employee('NV002', '456', 'Tran Thi B', '987654321'),
      // new Employee('NV003', '789', 'Le Thi C', '456123789'),
    ];
  }

  addEmployee(maNV, pass, tenNV, soDT) {
    const newEmployee = new Employee(maNV, pass, tenNV, soDT);
    this.employees.push(newEmployee);
  }

  deleteEmployee(maNV) {
    this.employees = this.employees.filter(emp => emp.maNV !== maNV);
  }

  getEmployeeByMaNV(maNV) {
    return this.employees.find(emp => emp.maNV === maNV);
  }

  getAllEmployees() {
    return this.employees;
  }
}

export default ArrEmployee; 
