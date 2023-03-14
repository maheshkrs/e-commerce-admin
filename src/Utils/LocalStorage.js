export const project_SetLocal = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  };
  export const project_GetLocal = (key) => {
    let value = localStorage.getItem(key);
    return JSON.parse(value);
  };
  export const project_ClearLocal = () => {
    localStorage.clear();
  };
  
  export const projectStorageKeys = {
    authToken: "token",
    userDetails: "userdeatails",
  };
  