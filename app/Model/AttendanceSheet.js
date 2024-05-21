class AttendanceSheet {
  constructor(id, maNV, date, timein = null, timeout = null) {
    this.id = id;
    this.maNV = maNV;
    this.date = date;
    this.timein = timein;
    this.timeout = timeout;
  }
  getMaNV() {
    return this.maNV;
  }
  getID() {
    return this.id;
  }

  getDate() {
    return this.date;
  }

  getTimeIn() {
    return this.timein;
  }

  getTimeOut() {
    return this.timeout;
  }
  toString() {
    //   if (this.timein !== null && this.timeout !== null) {
    //     return `${this.maNV} - ${this.date} - ${this.timein} - ${this.timeout}`;
    //   } else {
    return `${this.maNV}#${this.date}`;
    //   }
  }
}

export default AttendanceSheet;
