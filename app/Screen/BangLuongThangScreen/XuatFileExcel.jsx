import React from 'react';
import { View, Text, StyleSheet, Button, Alert, Linking } from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as XLSX from 'xlsx';

export default function XuatFileExcel({ route }) {
  const { salaryList } = route.params;

  const exportToExcel = async () => {
    try {
      // Tạo workbook mới
      const wb = XLSX.utils.book_new();

      // Chuyển đổi dữ liệu thành định dạng cho file Excel
      const wsData = salaryList.map((employee) => [
        employee.maNV,
        employee.tenNV,
        employee.salary,
      ]);

      // Tạo worksheet từ dữ liệu
      const ws = XLSX.utils.aoa_to_sheet([['Mã NV', 'Tên NV', 'Lương'], ...wsData]);

      // Thêm worksheet vào workbook
      XLSX.utils.book_append_sheet(wb, ws, 'Danh sách nhân viên');

      // Tạo tên file
      const fileName = `Danh_sach_nhan_vien_${Date.now()}.xlsx`;

      // Tạo đường dẫn cho file trong thư mục Documents
      const filePath = FileSystem.documentDirectory + fileName;

      // Ghi file vào hệ thống
      await FileSystem.writeAsStringAsync(filePath, XLSX.write(wb, { type: 'base64' }), {
        encoding: FileSystem.EncodingType.Base64,
      });
      console.log(filePath);
      // Hiển thị thông báo và cung cấp tải xuống
      Alert.alert('Xuất Excel thành công', 'File đã được lưu vào thư mục Documents', [
        {
          text: 'Mở thư mục',
          onPress: async () => {
            // Mở thư mục chứa file
            const folderPath = FileSystem.documentDirectory;
            
            await Linking.openURL(folderPath);
          },
        },
      ]);
    } catch (error) {
      console.error('Xuất Excel lỗi:', error);
      Alert.alert('Xuất Excel lỗi', 'Đã xảy ra lỗi khi xuất file Excel');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Xuất File Excel</Text>
      <Button title="Xuất Excel" onPress={exportToExcel} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});
