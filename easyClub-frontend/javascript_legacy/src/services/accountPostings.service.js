import axios from "axios";
import authHeader from "./auth-header";
const API_URL = "http://localhost:8080/api/v1/";
const API_URL_ACCOUNTPOSTING = API_URL + "accountPostings/";
class AccountPostingsService {
    
    getAllAccountPostings() {
        return axios.get(API_URL_ACCOUNTPOSTING + "all", { headers: authHeader() });
      }
    
}
export default new AccountPostingsService();