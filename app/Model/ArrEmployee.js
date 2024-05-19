import Employee from './Employee';
class ArrEmployee {
  constructor() {
    this.employees = [
      new Employee('NV001', '123', 'Nguyễn Văn A', '123789', 'admin', 'Hà Nội', 'Trưởng phòng', 10000000),
      new Employee('NV002', '456', 'Trần Thị B', '987654321', 'user', 'Hồ Chí Minh', 'Nhân viên', 8000000),
      new Employee('1', '1', 'Nguyễn Văn C', '123456789', 'admin', 'Đà Nẵng', 'Giám đốc', 15000000),
      new Employee('2', '1', 'Nguyễn Văn D', '123456789', 'user', 'Cần Thơ', 'Thực tập', 5000000),
    ];
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

  getAllEmployees() {
    return this.employees;
  }
}

const arrEmployee = new ArrEmployee();
export default arrEmployee;
