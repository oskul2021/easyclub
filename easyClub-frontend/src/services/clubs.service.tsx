import axios, { AxiosResponse } from "axios";
import authHeader from "./auth-header";
import { Club } from "../types/club.type";
const API_URL = "http://localhost:9000/api/v1/";
const API_URL_ClUB = API_URL + "club/";
class ClubsService {

  changeClub(club: any, data: any) {
    data.id = club;
    return axios.post(API_URL_ClUB + "change-club", data, {
      headers: authHeader(),
    });
  }

  getAllClubs(): Promise<AxiosResponse<Club[], any>> {
    return axios.get(API_URL_ClUB + "all", { headers: authHeader() });
  }
}
export default new ClubsService();
