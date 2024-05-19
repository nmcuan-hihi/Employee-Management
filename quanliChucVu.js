import ChucVu from "./chucvu";

export default class QuanLiChucVu {
  constructor() {
    this.ChucVus = [new ChucVu('NV', 'Nhân viên'), new ChucVu('GD', 'Giám đốc'), new ChucVu('QL', 'Quản lí')];
  }

  addChucVu(maCv, tenCv) {
    const chucVu = new ChucVu(maCv, tenCv);
    this.ChucVus.push(chucVu);
    // Cập nhật lại danh sách chức vụ trong đối tượng QuanLi
    quanLi.assignChucVu(this);
  }
  

  displayChucVu() {
    return this.ChucVus;
  }
}
