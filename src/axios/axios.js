import axios from "axios";
const getToken = async () => {
  try {
    const token = localStorage.getItem("token");
    if (token !== null) {
      const authorization = `${token}`;
      return authorization;
    }
    return null;
  } catch (err) {
    console.log("error", err);
  }
};

const instance = axios.create({
  baseURL: "https://dev-api-restaurant.kzo.starfii.com/",

  headers: {
    Accept: "application/json",
  },
});
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 403 || error.response.status === 401) {
      localStorage.removeItem("token");

      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

const getApiClient = async () => {
  instance.defaults.headers.common["x-auth-token"] = await getToken();

  return instance;
};
export default getApiClient;
