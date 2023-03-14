import axios from "axios";

const authToken = "some auth token";
const headers = {
  Authorization: `Bearer ${authToken}`,
};

const axiosInstance = axios.create({
  // baseURL: process.env.REACT_APP_BASE_URL,
  headers: headers,
});

axiosInstance.interceptors.request.use((request) => {
    // console.log("baseSrvIndex req", request);
    return request;
  });
  
  axiosInstance.interceptors.response.use((response) => {
    // console.log("baseSrvIndex res----", response);
    return response;
  });

  export default axiosInstance;