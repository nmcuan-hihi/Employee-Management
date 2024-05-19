import NhanVien from './nhanvien';
import QuanLiChucVu from './quanliChucVu';

class QuanLi {
  constructor() {
    this.nhanViens = [
      new NhanVien('111', 'huy', '2354655564', 'Dong Nai', 'Giám đốc', '2000000'),
      new NhanVien('222', 'duc', '2354655564', 'dak lak', 'Nhân viên', '1500000'),
      new NhanVien('333', 'su', '2354655564', 'dak lak', 'Quản lí', '1600000'),
      new NhanVien('444', 'quan', '2354655564', 'Ha Tinh', 'Quản lí', '1600000')
    ];
    this.quanLiChucVu = new QuanLiChucVu(); // Thêm đối tượng QuanLiChucVu
  }



  // Method to add an employee by job title
  addNhanVien(maNv, tenNv, soDT, diaChi, tenChucVu, mucLuong) {
    const nhanVien = new NhanVien(maNv, tenNv, soDT, diaChi, tenChucVu.tenCv, mucLuong);
    this.nhanViens.push(nhanVien);
    console.log("ok.");
  }


  deleteNhanVien(maNv) {
    this.nhanViens = this.nhanViens.filter(nhanVien => nhanVien.getMaNv() !== maNv);
  }

  // Method to edit an employee
  editNhanVien(maNv, newInfo) {
    // Tìm vị trí của nhân viên trong mảng dựa trên mã nhân viên
    const nhanVienIndex = this.nhanViens.findIndex((nhanVien) => nhanVien.maNv === maNv);

    // Kiểm tra xem nhân viên có tồn tại trong danh sách hay không
    if (nhanVienIndex !== -1) {
      // Lấy ra đối tượng nhân viên từ mảng nhanViens
      const nhanVien = this.nhanViens[nhanVienIndex];

      // Sửa đổi thông tin nhân viên nếu thông tin mới được cung cấp
      if (newInfo.tenNv !== undefined) nhanVien.tenNv = newInfo.tenNv;
      if (newInfo.soDT !== undefined) nhanVien.soDT = newInfo.soDT;
      if (newInfo.diaChi !== undefined) nhanVien.diaChi = newInfo.diaChi;
      if (newInfo.tenChucVu !== undefined) nhanVien.tenChucVu = newInfo.tenChucVu;
      if (newInfo.mucLuong !== undefined) nhanVien.mucLuong = newInfo.mucLuong;

      // Cập nhật lại nhân viên trong mảng nhanViens
      this.nhanViens[nhanVienIndex] = nhanVien;
    } else {
      console.log(`Không tìm thấy nhân viên có mã ${maNv}`);
    }
  }

  findEmployeeById(maNv) {
    return this.nhanViens.find(nv => nv.maNv === maNv);
  }
  // Method to display all employees
  displayEmployees() {
    return this.nhanViens;
  }
}
const quanLi = new QuanLi();
export default quanLi;

