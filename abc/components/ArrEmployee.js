import Employee from './Employee';

class ArrEmployee {
  constructor() {
    this.employees = [
      new Employee('NV001', '123', 'Nguyễn Văn A', '123456789', 'admin'),
      new Employee('NV002', '456', 'Trần Thị B', '987654321', 'user'),
      new Employee('1', '1', 'Nguyễn Văn A', '123456789', 'admin'),
      new Employee('2', '2', 'Nguyễn Văn A', '123456789', 'user'),
    ];
  }
 getAllEmployees() {
    return this.employees;
}

  addEmployee(maNV, pass, tenNV, soDT, quyen) {
    const newEmployee = new Employee(maNV, pass, tenNV, soDT, quyen);
    this.employees.push(newEmployee);
  }

  deleteEmployee(maNV) {
    this.employees = this.employees.filter(emp => emp.maNV !== maNV);
  }

  getEmployeeByMaNV(maNV) {
    return this.employees.find(emp => emp.maNV === maNV);
  }


}

export default ArrEmployee;

