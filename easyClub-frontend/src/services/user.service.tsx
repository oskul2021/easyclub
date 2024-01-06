import axios, { AxiosResponse } from 'axios';
import authHeader from './auth-header';
import { AppUser } from '../types/app-user.type';
const API_URL = 'http://localhost:9000/api/v1/';
const API_URL_USER = 'http://localhost:9000/api/v1/user/';
class UserService {
  changeUser(user: any, data: any) {
    data.id = user;
    return axios.post(API_URL_USER + 'change-user', data, {
      headers: authHeader(),
    });
  }

  deleteUsers(users: any) {
    return axios.delete(API_URL_USER + 'delete', {
      headers: authHeader(),
      data: users,
    });
  }

  uploadPicture(id: any, picture: any) {
    const formData = new FormData();
    formData.append('file', picture);
    formData.append('fileName', picture.name);
    formData.append('id', id);
    return axios.post(`${API_URL_USER}user-picture`, formData, {
      headers: { ...authHeader(), 'content-type': 'multipart/form-data' },
    });
  }

  getAllUsers(): Promise<AxiosResponse<AppUser[], any>> {
    return axios.get(API_URL_USER + 'all', { headers: authHeader() });
  }

  getPublicContent() {
    return axios.get(API_URL + 'all');
  }
  getUserBoard() {
    return axios.get(API_URL + 'user', { headers: authHeader() });
  }
  getModeratorBoard() {
    return axios.get(API_URL + 'mod', { headers: authHeader() });
  }
  getAdminBoard() {
    return axios.get(API_URL + 'admin', { headers: authHeader() });
  }
}
export default new UserService();
