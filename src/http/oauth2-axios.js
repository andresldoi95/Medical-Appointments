import axios from "axios";
import usersService from "@/services/general/users";
import router from "@/router";

axios.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("token");
    config.headers = {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    };
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    if (error.response && error.response.status === 401) {
      usersService.logout();
      router.push({
        name: 'Login'
      });
    }
    return Promise.reject(error);
  }
);

export default axios;
