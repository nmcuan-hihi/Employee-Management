import axios from 'axios';
import ChucVu from './ChucVu';

class QuanLiChucVu {
  constructor() {
    this.ChucVus = [];
  }


  async addChucVu(maCv, tenCv) {
    try {
      const response = await axios.post(`http://10.0.2.2:8080/positions/addPosition`, { maCv, tenCv });
      const newChucVu = new ChucVu(response.data.maCv, response.data.tenCv);
      this.ChucVus.push(newChucVu);
    } catch (error) {
      console.error('Failed to add ChucVu:', error);
    }
  }
  async displayChucVuAPI(){
    try {
        const response = await axios.get('http://10.0.2.2:8080/positions/getAllPosition');
        console.log('API response:', response.data); // Log toàn bộ phản hồi API
        const mappedData = response.data.map(cvData => new ChucVu(cvData.maCV, cvData.tenCV));
        console.log('Mapped data:', mappedData); // Log dữ liệu sau khi map
        this.ChucVus = mappedData;
        return this.ChucVus;
    } catch (error) {
        console.error(error);
        return [];
    }
}

}

export default QuanLiChucVu;
