export default class NhanVien {
  constructor(maNv, tenNv, soDT, diaChi, tenChucVu, mucLuong) {
    this.maNv = maNv;
    this.tenNv = tenNv;
    this.soDT = soDT;
    this.diaChi = diaChi;
    this.tenChucVu = tenChucVu;
    this.mucLuong = mucLuong;
  }

  setMaNv(maNv) {
    this.maNv = maNv;
  }

  getMaNv() {
    return this.maNv;
  }

  setTenNv(tenNv) {
    this.tenNv = tenNv;
  }

  getTenNv() {
    return this.tenNv;
  }

  setSoDT(soDT) {
    this.soDT = soDT;
  }

  getSoDT() {
    return this.soDT;
  }

  setDiaChi(diaChi) {
    this.diaChi = diaChi;
  }

  getDiaChi() {
    return this.diaChi;
  }

  setTenChucVu(tenChucVu) {
    this.tenChucVu = tenChucVu;
  }

  getTenChucVu() {
    return this.tenChucVu;
  }

  setMucLuong(mucLuong) {
    this.mucLuong = mucLuong;
  }

  getMucLuong() {
    return this.mucLuong;
  }
}
