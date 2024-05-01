class Employee {
  constructor(maNV, pass, tenNV, soDT, quyen) {
    this.maNV = maNV;
    this.pass = pass;
    this.tenNV = tenNV;
    this.soDT = soDT;
    this.quyen = quyen;
  }

  getFullInfo() {
    return `${this.tenNV} - ${this.soDT}`;
  }
}

export default Employee;
