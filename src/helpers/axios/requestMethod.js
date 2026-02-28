import axios from 'axios';
import { BASE_URL } from '../config/envConfig';

// const getToken = () => {
//   const user = JSON.parse(localStorage.getItem('user'));
//   return user ? user?.accessToken : "";
// };

export const getToken = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  // console.log(user?.accessToken)
  return user?.accessToken;
};

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});
// console.log("Token being sent from frontend:", getToken()); // Log to confirm token presence

export const userRequest = axios.create({
  baseURL: BASE_URL,

  //   headers: {
  //   'Authorization': `Bearer ${localStorage.getItem('token')}` // Fetch token from localStorage

  //   // Authorization: `Bearer ${getToken()}`, // Ensure the "Bearer" prefix is used with the token
  // },
  // // headers: { Authorization: `Bearer ${getToken()}` },

  // // headers: { token: `Bearer ${getToken()}` },
});

// Dynamically attach the token before each request
// This ensures token changes (login/logout) are always picked up
userRequest.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

// console.log(userRequest())
