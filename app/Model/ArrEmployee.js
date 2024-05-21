import axios from 'axios';
import Employee from './Employee';

class ArrEmployee {
  constructor() {
    this.employees = [];    
    
  }

  addEmployee(maNV, pass, tenNV, soDT, quyen, diaChi, viTri, luong) {
    const newEmployee = new Employee(maNV, pass, tenNV, soDT, quyen, diaChi, viTri, luong);
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

  async getArremployeeAPI() {
    try {
      const response = await axios.get('http://10.0.2.2:8080/employee/getAll');
      this.employees = response.data.map(empData => new Employee(
        empData.maNV,
        empData.pass,
        empData.tenNV,
        empData.soDT,
        empData.quyen,
        empData.diaChi,
        empData.tenChucVu,
        empData.mucLuong
      ));
      return this.employees;
    } catch (error) {
      console.error(error);
      return [];
    }
  }
}

export default ArrEmployee;
