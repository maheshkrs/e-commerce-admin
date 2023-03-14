import axiosInstence from "./baseService";


export const getRequest = async (url) => {
    try {
      const response = await axiosInstence.get(url);
      //   console.log("getRequest service method request==>", response);
      return response;
    } catch (error) {
      console.log("getRequest error==>", error.response);
      return error.response;
    }
  };