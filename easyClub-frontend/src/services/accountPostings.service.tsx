import axios, { AxiosResponse } from "axios";
import authHeader from "./auth-header";
import { AccountPosting } from "../types/account-posting.type";
import { csvLines } from "src/types/csvLines.type";
const API_URL = "http://localhost:9000/api/v1/";
const API_URL_ACCOUNTPOSTING = API_URL + "accountPostings/";
export default class AccountPostingsService {

  static postAllAccountPostings(e: AccountPosting): Promise<AxiosResponse<AccountPosting, any>> {
    return axios.post(API_URL_ACCOUNTPOSTING + "add", e, { headers: authHeader() });
  }

  static getAllAccountPostings(): Promise<AxiosResponse<AccountPosting[], any>> {
    return axios.get(API_URL_ACCOUNTPOSTING + "all", { headers: authHeader() });
  }

  static getAccountPostingsByYear(year: number): Promise<AxiosResponse<AccountPosting[], any>> {
    return axios.get(API_URL_ACCOUNTPOSTING + "year/" + year, { headers: authHeader() });
  }

  static getAccountPostingsYears(): Promise<AxiosResponse<number[], any>> {
    return axios.get(API_URL_ACCOUNTPOSTING + "years", { headers: authHeader() });
  }

  static csvUpload(e: any): Promise<AxiosResponse<csvLines[], any>> {
    const formData = new FormData()
    formData.append('file',e)
    return axios.post(API_URL_ACCOUNTPOSTING + "upload", formData,{ headers: {...authHeader(),'content-type': 'multipart/form-data'} });
  }
}