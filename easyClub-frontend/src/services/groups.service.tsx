import axios from "axios";
import authHeader from "./auth-header";
const API_URL = "http://localhost:9000/api/v1/";
const API_URL_GROUPS = API_URL + "group/";
class GroupsService {

  getGroupsOfUser(userId: any) {
    return axios.get(API_URL_GROUPS + userId, { headers: authHeader() });
  }

  getAllGroups() {
    return axios.get(API_URL_GROUPS, { headers: authHeader() });
  }

  createGroup(group: any) {
    return axios.post(API_URL_GROUPS, group, { headers: authHeader() });
  }

  editGroup(group: any, groupId: any) {
    return axios.patch(API_URL_GROUPS + groupId, group, { headers: authHeader() });
  }

  deleteGroup(groupId: any) {
    return axios.delete(API_URL_GROUPS + groupId, { headers: authHeader() });
  }

  getRestUsersOfGroup(groupId: any) {
    return axios.get(API_URL_GROUPS + "restUsers/" + groupId, { headers: authHeader() });
  }

  addUser(userId: any, groupId: any) {
    return axios.put(API_URL_GROUPS + "addUser/" + userId + "/" + groupId, null, { headers: authHeader() });
  }

  removeUser(userId: any, groupId: any) {
    return axios.put(API_URL_GROUPS + "removeUser/" + userId + "/" + groupId, null, { headers: authHeader() });
  }

  sendUserMessage(toUserId: any, fromUserId: any, message: any) {
    return axios.post(API_URL_GROUPS + "sendUserMail/" + fromUserId + "/" + toUserId, message, { headers: authHeader() });
  }

  sendGroupMessage(groupId: any, fromUserId: any, message: any) {
    return axios.post(API_URL_GROUPS + "sendGroupMail/" + fromUserId + "/" + groupId, message, { headers: authHeader() });
  }
}
export default new GroupsService();
