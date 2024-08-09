import axios from 'axios';
import { BASE_URL } from '../config/envConfig';

const getToken = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  return user ? user?.accessToken : "";
};

export const publicRequest = axios.create({
    baseURL: BASE_URL,
});

export const userRequest = axios.create({
    baseURL: BASE_URL,
    // headers: { Authorization: `Bearer ${getToken()}` },

    headers: { token: `Bearer ${getToken()}` },
});
