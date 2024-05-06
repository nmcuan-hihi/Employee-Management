import AttendanceSheet from './AttendanceSheet';

class ManageAttendance {
  constructor() {
    this.attendanceList = [
      new AttendanceSheet('NV001', '2024-04-01', '08:00', '17:00'),
      new AttendanceSheet('NV001', '2024-04-02', '08:00', '17:00'),
      new AttendanceSheet('NV001', '2024-04-03', '08:00', '17:00'),
      new AttendanceSheet('NV001', '2024-04-04', '08:00', '17:00'),
      new AttendanceSheet('NV001', '2024-04-05', '08:00', '17:00'),
      new AttendanceSheet('NV001', '2024-04-06', '08:00', '17:00'),
      new AttendanceSheet('NV001', '2024-04-07', '08:00', '17:00'),

      new AttendanceSheet('NV002', '2024-04-01', '08:15', '17:15'),
      new AttendanceSheet('NV002', '2024-04-02', '08:15', '17:15'),
      new AttendanceSheet('NV002', '2024-04-03', '08:15', '17:15'),
      new AttendanceSheet('NV002', '2024-04-04', '08:15', '17:15'),
      new AttendanceSheet('NV002', '2024-04-05', '08:15', '17:15'),
      new AttendanceSheet('NV002', '2024-04-06', '08:15', '17:15'),
      new AttendanceSheet('NV002', '2024-04-07', '08:15', '17:15'),

      new AttendanceSheet('NV003', '2024-04-01', '08:30', '17:30'),
      new AttendanceSheet('NV003', '2024-04-02', '08:30', '17:30'),
      new AttendanceSheet('NV003', '2024-04-03', '08:30', '17:30'),
      new AttendanceSheet('NV003', '2024-04-04', '08:30', '17:30'),
      new AttendanceSheet('NV003', '2024-04-05', '08:30', '17:30'),
      new AttendanceSheet('NV003', '2024-04-06', '08:30', '17:30'),
      new AttendanceSheet('NV003', '2024-04-07', '08:30', '17:30'),
      
      
    ];
  }

  addAttendance(maNV, date, timein = null, timeout = null) {
    if (!this.attendanceList) { // Kiểm tra nếu attendanceList chưa được khởi tạo
      this.attendanceList = []; // Khởi tạo attendanceList là một mảng rỗng
    }
    const newAttendance = new AttendanceSheet(maNV, date, timein, timeout);
    this.attendanceList.push(newAttendance); // Thêm mới vào attendanceList
  }

  deleteAttendance(maNV, date) {
    this.attendanceList = this.attendanceList.filter(attendance =>
      attendance.maNV !== maNV || attendance.date !== date
    );
  }

  getAttendanceByMaNV(maNV) {
    return this.attendanceList.filter(attendance => attendance.maNV === maNV);
  }

  getAllAttendance() {
    return this.attendanceList;
  }

  countWorkingDays(maNV, month, year) {
    const filteredAttendance = this.attendanceList.filter(attendance => {
      const attendanceDate = new Date(attendance.date);
      return attendance.maNV === maNV &&
             attendanceDate.getMonth() === month - 1 &&
             attendanceDate.getFullYear() === year;
    });

    const workingDaysSet = new Set(filteredAttendance.map(attendance => attendance.date));
    return workingDaysSet.size;
  }
  getAttendanceData(maNV, date) {
    return this.attendanceList.filter(attendance => attendance.maNV === maNV && attendance.date === date);
  }
}

const manageAttendance = new ManageAttendance();
export default manageAttendance;