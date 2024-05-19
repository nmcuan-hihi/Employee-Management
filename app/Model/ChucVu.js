export default class ChucVu {
    constructor(maCv,tenCv){
        this.maCv = maCv
        this.tenCv = tenCv
    }
    setMaCv(maCv) {
        this.maCv = maCv;
      }
    
      getMaCv() {
        return this.maCv;
      }

      setTenCv(tenCv) {
        this.tenCv = tenCv;
      }
    
      getTenCv() {
        return this.tenCv;
      }
}