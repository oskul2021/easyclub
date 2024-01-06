import axios from "axios";
import authHeader from "./auth-header";
const API_URL = "http://localhost:8080/api/v1/";
class AuthService {
  // POST {username, password} & save JWT to Local Storage
  login(userName, password) {
    return axios
      .post(API_URL + "signin", {
        userName,
        password,
      })
      .then((response) => {
        if (response.data.token) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data;
      });
  }
  //remove JWT from Local Storage
  logout() {
    localStorage.removeItem("user");
  }
  // POST {username, email, password}
  register(
    firstName,
    lastName,
    birthDate,
    street,
    number,
    city,
    email,
    phoneNumber,
    mobileNumber
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
    return JSON.parse(localStorage.getItem("user"));
  }

  changePassword(id, oldPassword, newPassword, passwordRepeat) {
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

  forgotPassword(data) {
    return axios.post(API_URL + "forgot-password/change", data);
  }

  requestPasswordChange(data) {
    return axios.post(API_URL + "forgot-password", data);
  }
}
export default new AuthService();
