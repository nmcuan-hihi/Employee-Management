class Employee {
  constructor(maNV, pass, tenNV, soDT, quyen, diaChi, tenChucVu, mucLuong, imageUrl) {
    this.maNV = maNV;
    this.pass = pass;
    this.tenNV = tenNV;
    this.soDT = soDT;
    this.diaChi = diaChi;
    this.tenChucVu = tenChucVu;
    this.mucLuong = mucLuong;
    this.quyen = quyen;
    this.imageUrl = imageUrl;
  }

  getFullInfo() {
    return `Name: ${this.tenNV}, Phone: ${this.soDT}, Address: ${this.diaChi}, Position: ${this.tenChucVu}, Salary: ${this.mucLuong}, Rights: ${this.quyen}, Image: ${this.imageUrl}`;
  }
  toString() {
    return `Name: ${this.tenNV}, Phone: ${this.soDT}, Address: ${this.diaChi}, Position: ${this.tenChucVu}, Salary: ${this.mucLuong}, Rights: ${this.quyen}, Image: ${this.imageUrl}`;
  }
}

export default Employee;
