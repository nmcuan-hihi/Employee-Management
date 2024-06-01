import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import XLSX from 'xlsx'; //npm install xlsx expo install expo-sharing
import ManageAttendance from './AttendanceSheetManager';
import moment from 'moment';

const ExportExcelDetails = ({ item, month, year }) => {
    const manageAttendance = new ManageAttendance();
    const exportToExcel = async () => {
        // Tạo một workbook mới
        const wb = XLSX.utils.book_new();

        // Chuyển đổi dữ liệu của item thành mảng các đối tượng JSON
        const itemData = [JSON.parse(JSON.stringify(item))];

        // Tạo một worksheet mới từ dữ liệu của item
        const itemWS = XLSX.utils.json_to_sheet(itemData);

        // Thêm tiêu đề cho bảng chấm công
        const attendanceHeaders = ['Ngày', 'Giờ vào', 'Giờ ra'];
        XLSX.utils.sheet_add_aoa(itemWS, [attendanceHeaders], { origin: 'A4' });

        // Tạo bảng lương cho 31 ngày trong tháng
        const salaryTable = await createSalaryTable(item.maNV, month, year);

        // Tính toán vị trí cần thêm bảng lương vào
        const range = XLSX.utils.decode_range(itemWS['!ref']);
        const rowIndex = range.e.r + 2; // Dòng tiếp theo sau thông tin nhân viên và tiêu đề

        // Thêm dữ liệu của bảng lương vào worksheet với thông tin nhân viên
        const salaryTableData = salaryTable.map(row => [row.day, row.timeIn, row.timeOut]);
        XLSX.utils.sheet_add_aoa(itemWS, salaryTableData, { origin: `A${rowIndex}` });

        // Thêm worksheet với thông tin nhân viên và bảng lương vào workbook
        XLSX.utils.book_append_sheet(wb, itemWS, `Chi Tiết T${month}-${year}`);

        // Ghi workbook thành file Excel
        const wbout = XLSX.write(wb, { type: 'base64', bookType: 'xlsx' });

        // Tạo tên file dựa trên thời gian và ngày tháng năm
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const day = now.getDate().toString().padStart(2, '0');
        const monthPart = (now.getMonth() + 1).toString().padStart(2, '0');
        const yearPart = now.getFullYear().toString();
        const fileName = `ChiTiet_${hours}${minutes}_${day}${monthPart}${yearPart}_T${month}_${year}.xlsx`;

        // Đường dẫn lưu file
        const fileUri = `${FileSystem.documentDirectory}${fileName}`;

        // Ghi file Excel vào hệ thống tệp
        await FileSystem.writeAsStringAsync(fileUri, wbout, {
            encoding: FileSystem.EncodingType.Base64,
        });

        // Chia sẻ file hoặc mở file
        await Sharing.shareAsync(fileUri);
    };

    // Hàm tạo bảng lương cho 31 ngày trong tháng
    const createSalaryTable = async (maNV, month, year) => {
        const salaryTable = [];
        console.log(`${year}-${month}-${1}`);
        for (let i = 1; i <= 31; i++) {
            const date = moment(`${year}-${month}-${i}`, 'YYYY-MM-DD'); // lấy ngày của từng cột
            const dayAttendance = await manageAttendance.getAttendanceData(maNV, date.format('YYYY-MM-DD'));

            console.log("time " + dayAttendance)
            let timeIn = '  --  ';
            let timeOut = '  --  ';
            if (dayAttendance.length > 0) {
                timeIn = dayAttendance[0].timein;
                timeOut = dayAttendance[0].timeout;
            }
            salaryTable.push({ day: i, timeIn, timeOut });
        }
        return salaryTable;
    };

    return (
        <TouchableOpacity onPress={exportToExcel}>
            <Text>Export Excel</Text>
        </TouchableOpacity>
    );
};

export default ExportExcelDetails;
