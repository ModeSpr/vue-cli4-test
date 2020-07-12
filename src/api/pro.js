import http from '@/utils/http';

const pro =  {
  getCategory() {
    return http.get("/pro/category");
  }
}
export default pro