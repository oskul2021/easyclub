import axios from "axios";
import authHeader from "./auth-header";
import { AuthUser } from "../types/auth-user.type";
const API_URL = "http://localhost:9000/api/v1/";
class AuthService {
  // POST {username, password} & save JWT to Local Storage
  async login(userName: string, password: string) {
    const response = await axios
      .post(API_URL + "signin", {
        userName,
        password,
      });
    const user: AuthUser = response.data;
    if (user.token)
      localStorage.setItem("user", JSON.stringify(response.data));
    return user;
  }
  //remove JWT from Local Storage
  logout() {
    localStorage.removeItem("user");
  }
  // POST {username, email, password}
  register(
    firstName: any,
    lastName: any,
    birthDate: any,
    street: any,
    number: any,
    city: any,
    email: any,
    phoneNumber: any,
    mobileNumber: any
  ) {
    return axios.post(
      API_URL + "registration",
      {
        firstName,
        lastName,
        birthDate,
        street,
        number,
        city,
        email,
        phoneNumber,
        mobileNumber,
      },
      { headers: authHeader() }
    );
  }
  // get stored user information (including JWT)
  getCurrentUser() {
    const u = localStorage.getItem("user");
    if (!u) return;
    return JSON.parse(u) as AuthUser;
  }

  changePassword(id: any, oldPassword: any, newPassword: any, passwordRepeat: any) {
    return axios.post(
      API_URL + "change-password",
      {
        id,
        oldPassword,
        newPassword,
        passwordRepeat,
      },
      { headers: authHeader() }
    );
  }

  forgotPassword(data: any) {
    return axios.post(API_URL + "forgot-password/change", data);
  }

  requestPasswordChange(data: any) {
    return axios.post(API_URL + "forgot-password", data);
  }
}
export default new AuthService();
