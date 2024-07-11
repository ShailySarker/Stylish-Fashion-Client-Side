import axios from "axios";
import { BASE_URL } from "../config/envConfig";

export const publicRequest = axios.create({
    baseURL: BASE_URL,
  });
  
  export const userRequest = axios.create({
    baseURL: BASE_URL,
    header: { token: `Bearer ${import.meta.env.TOKEN_ID}` },
  });