import axios from "axios";

const authEndpoint = "https://accounts.spotify.com/authorize?";
const clientID = "858aef2d93354c4788cff5c070e0e847";
const redirectUrl = "http://localhost:5173/";
const scopes = ["user-library-read", "playlist-read-private"];

export const loginEndpoint = `${authEndpoint}client_id=${clientID}&redirect_uri=${redirectUrl}&scope=${scopes.join(
  "%20"
)}&response_type=token&show_dialog=true`;

const apiClient = axios.create(
  {
    baseURL: 'https://api.spotify.com/v1',
  }
)

export const setClientToken = (token) => {
    apiClient.interceptors.request.use(async function (config) {
      config.headers.Authorization = `Bearer ${token}`;
      return config;
    }
  )
}

export default apiClient;