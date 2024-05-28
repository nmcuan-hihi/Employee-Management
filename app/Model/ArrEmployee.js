import axios from 'axios';
import Employee from './Employee';

class ArrEmployee {
  constructor() {
    this.employees = [];    
    
  }

  async addEmployee(maNV, pass, tenNV, soDT, quyen, diaChi, tenChucVu, mucLuong) {
    try {
      const response = await axios.post(`http://10.0.2.2:8080/employee/add`, {
        maNV,
        pass,
        tenNV,
        soDT,
        quyen,
        diaChi,
        tenChucVu,
        mucLuong
      });
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async deleteEmployee(maNV) {
    try {
      await axios.delete(`http://10.0.2.2:8080/employee/delete/${maNV}`);
      await this.getArremployeeAPI(); // Cập nhật lại danh sách sau khi xóa
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  }
  getEmployeeByMaNV(maNV) {
    return this.employees.find(emp => emp.maNV === maNV);
  }
  async getEmployeeByMaNVApi(maNV) {
    try {
        const response = await axios.get(`http://10.0.2.2:8080/employee/${maNV}`);
        const empData = response.data;

        // Trả về đối tượng Employee từ dữ liệu nhận được
        return new Employee(
            empData.maNV,
            empData.pass,
            empData.tenNV,
            empData.soDT,
            empData.quyen,
            empData.diaChi,
            empData.tenChucVu,
            empData.mucLuong
        );
    } catch (error) {
        console.error('Error fetching employee by maNV:', error);
        return null;
    }
}


  async editEmployee(maNV, newInfo) {
    try {
      await axios.put(`http://10.0.2.2:8080/employee/update/${maNV}`, newInfo);
      await this.getArremployeeAPI(); // Cập nhật lại danh sách sau khi chỉnh sửa
    } catch (error) {
      console.error('Error editing employee:', error);
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
