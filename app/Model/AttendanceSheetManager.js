import axios from 'axios';
import AttendanceSheet from './AttendanceSheet';
import { Alert } from 'react-native';

class ManageAttendance {
  constructor() {
    this.attendanceList = [];    
  }

  addAttendance(maNV, date, timein = null, timeout = null) {
    // Check if the attendance for the given employee and date already exists
    const existingAttendanceIndex = this.attendanceList.findIndex(attendance =>
      attendance.maNV === maNV && attendance.date === date
    );

    // If the attendance exists, update it; otherwise, add a new attendance
    if (existingAttendanceIndex !== -1) {
      this.attendanceList[existingAttendanceIndex] = new AttendanceSheet(maNV, date, timein, timeout);
    } else {
      const newAttendance = new AttendanceSheet(maNV, date, timein, timeout);
      this.attendanceList.push(newAttendance);
    }
  }

  async deleteAttendance(id) {
    try {
      // Gọi API để xóa 
      await axios.delete(`http://10.0.2.2:8080/attendanceSheet/delete?id=${id}`);
      Alert.alert('OK', 'Xóa Thành Công!');
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to delete attendance record. Please try again!');
    }
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

  async getAttendanceData(maNV, date) {
    try {
        const response = await axios.get(`http://10.0.2.2:8080/attendanceSheet/getByMaNVAndDate?maNV=${maNV}&date=${date}`);
        const data = response.data.map(attenData => new AttendanceSheet(
            attenData.id,
            attenData.maNV,
            attenData.date,
            attenData.timein,
            attenData.timeout
        ));
        return data;
    } catch (error) {
        console.error(error);
        Alert.alert('Error', 'Failed to fetch attendance data. Please try again!');
        throw error;
    }
}


  async getArrAttendanceSheetAPI() {
    try {
      const response = await axios.get('http://10.0.2.2:8080/attendanceSheet/getAll');
      this.attendanceList = response.data.map(attenData => new AttendanceSheet(
        attenData.id,
        attenData.maNV,
        attenData.date,
        attenData.timein,
        attenData.timeout,     
      ));
      return this.attendanceList;
    } catch (error) {
      console.error(error);
    }
  }

  async addAttendanceSheetAPI(maNV, date, timein, timeout) {
    try {
      await axios.post('http://10.0.2.2:8080/attendanceSheet/add', {
        maNV: maNV,
        date: date,
        timein: timein,
        timeout: timeout,           
      });
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed. Please try again!');
    }
  }
}

export default ManageAttendance;
