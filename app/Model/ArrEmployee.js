import axios from 'axios';
import Employee from './Employee';

class ArrEmployee {
  constructor() {
    this.employees = [];
  }

  async addEmployee(maNV, pass, tenNV, soDT, quyen, diaChi, viTri, luong) {
    const newEmployee = new Employee(maNV, pass, tenNV, soDT, quyen, diaChi, viTri, luong);
    try {
      const response = await axios.post('http://10.0.2.2:8080/employee/add', newEmployee);
      if (response.status === 200 || response.status === 201) {
        this.employees.push(newEmployee);
        return true;  // Trả về trạng thái thành công
      } else {
        console.error('Lỗi khi thêm nhân viên:', response.status, response.statusText);
        return false;
      }
    } catch (error) {
      console.error('Lỗi khi thêm nhân viên:', error);
      return false;
    }
  }

  deleteEmployee(maNV) {
    this.employees = this.employees.filter(emp => emp.maNV !== maNV);
  }

  async getEmployeeByMaNV(maNV) {
    try {
      const response = await axios.get('http://10.0.2.2:8080/employee/getByMaNV/'+maNV);
      if (response.data && response.data.length > 0) {
        const empData = response.data[0]; // Lấy nhân viên đầu tiên từ mảng trả về
        const employee = new Employee(
          empData.maNV,
          empData.pass,
          empData.tenNV,
          empData.soDT,
          empData.quyen,
          empData.diaChi,
          empData.tenChucVu,
          empData.mucLuong
        );
        return employee;
      } else {
        return null;
      }
    } catch (error) {
      console.error('Lỗi khi lấy nhân viên:', error);
      return null;
    }
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
