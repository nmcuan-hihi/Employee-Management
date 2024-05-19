import ChucVu from "./ChucVu";

 class QuanLiChucVu {
  constructor() {
    this.ChucVus = [new ChucVu('NV', 'Nhân viên'), 
    new ChucVu('GD', 'Giám đốc'), 
    new ChucVu('TP', 'Trưởng phòng'), 
    new ChucVu('TT', 'Thực tập'), 
    new ChucVu('QL', 'Quản lí')];
  }

  addChucVu(maCv, tenCv) {
    const chucVu = new ChucVu(maCv, tenCv);
    this.ChucVus.push(chucVu);
    quanLi.assignChucVu(this);
  }
  

  displayChucVu() {
    return this.ChucVus;
  }
 
}
 const chucVus = new QuanLiChucVu();
  
  export default chucVus;