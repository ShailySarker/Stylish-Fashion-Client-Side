import axios from 'axios';
import { BASE_URL } from '../config/envConfig';

// const getToken = () => {
//     const user = JSON.parse(localStorage.getItem('persist:root'))?.user;
//     return user ? JSON.parse(user)?.currentUser?.accessToken : "";
// };

const getToken = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  return user ? user?.accessToken : "";
};

export const publicRequest = axios.create({
    baseURL: BASE_URL,
});

export const userRequest = axios.create({
    baseURL: BASE_URL,
    headers: { token: `Bearer ${getToken()}` },
});



// import axios from "axios";
// import { BASE_URL } from "../config/envConfig";

// export const publicRequest = axios.create({
//   baseURL: BASE_URL,
// });

// export const userRequest = axios.create({
//   baseURL: BASE_URL,
//   header: { token: `Bearer ${import.meta.env.VITE_TOKEN_ID}` },
// });

