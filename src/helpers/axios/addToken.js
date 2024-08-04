// import { userRequest } from "./requestMethod";

// // Function to get the current user's token
// const getAuthToken = () => {
//     const user = JSON.parse(localStorage.getItem('user'));
//     return user?.token; // Adjust based on how you store the token
// };

// // Function to make authenticated requests
// export const authenticatedRequest = async (method, url, data = {}) => {
//     // try {
//     const token = getAuthToken();
//     const response = await userRequest({
//         method,
//         url,
//         data,
//         headers: {
//             Authorization: `Bearer ${token}`, // Set token dynamically
//         },
//     });
//     return response;
//     // } catch (error) {
//     //     throw error;
//     // }
// };
