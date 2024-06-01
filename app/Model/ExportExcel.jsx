import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import XLSX from 'xlsx'; //npm install xlsx expo install expo-sharing



const ExportExcel = ({ month, year, salaryList }) => {
  const exportToExcel = async () => {
    // Tạo một workbook mới
    const wb = XLSX.utils.book_new();

    // Tạo một worksheet mới từ danh sách lương
    const ws = XLSX.utils.json_to_sheet(
      salaryList.map(item => ({
        'Mã NV': item.maNV,
        'Tên NV': item.tenNV,
        'Lương': item.salary,
        'Tổng Giờ': item.totalHours,      
      }))
    );

    
    XLSX.utils.book_append_sheet(wb, ws, `Bảng Lương T${month}-${year}`);

    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    const monthPart = (now.getMonth() + 1).toString().padStart(2, '0');
    const yearPart = now.getFullYear().toString();

    // Ghi workbook thành file Excel
    const wbout = XLSX.write(wb, { type: 'base64', bookType: 'xlsx' });


    const fileName = `${hours}${minutes}_${day}${monthPart}${yearPart}_T${month}_${year}.xlsx`;
    // Đường dẫn lưu file
    const fileUri = `${FileSystem.documentDirectory}${fileName}`;
   
    

    // Ghi file Excel vào hệ thống tệp
    await FileSystem.writeAsStringAsync(fileUri, wbout, {
      encoding: FileSystem.EncodingType.Base64,
    });

    // Chia sẻ file hoặc mở file
    await Sharing.shareAsync(fileUri);
  };

  return (
    <TouchableOpacity onPress={exportToExcel}>
      <Text>Export Excel</Text>
    </TouchableOpacity>
  );
};

export default ExportExcel;
