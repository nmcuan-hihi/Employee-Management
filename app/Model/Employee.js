
class Employee {
    constructor(maNV, pass, tenNV, soDT) {
      this.maNV = maNV;
      this.pass = pass;
      this.tenNV = tenNV;
      this.soDT = soDT;
    }
  
    getFullInfo() {
      return `${this.tenNV} - ${this.soDT}`;
    }
  }
  export default Employee;
  