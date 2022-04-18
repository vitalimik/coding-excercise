import axios, { AxiosInstance } from "axios";
import { API_URL } from "../constants";

const baseURL = API_URL;

const instance: AxiosInstance = axios.create({ baseURL });

export class ApiService {
  static post<T>(url: string, body: T) {
    return instance.post(url, body);
  }

  static get(url: string) {
    return instance.get(url);
  }
}
