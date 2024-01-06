import axios from "axios";
import authHeader from "./auth-header";
const API_URL = "http://localhost:8080/api/v1/";
const API_URL_ClUB = API_URL + "club/";
class ClubsService {

  changeClub(club, data) {
    data.id = club;
    return axios.post(API_URL_ClUB + "change-club", data, {
      headers: authHeader(),
    });
  }

  getAllClubs() {
    return axios.get(API_URL_ClUB + "all", { headers: authHeader() });
  }
}
export default new ClubsService();
