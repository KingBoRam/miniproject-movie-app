import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    // https://velog.io/@tmdgp0212/TIL230316-using-.env-on-vite
    api_key: import.meta.env.VITE_API_KEY,
    language: "ko-KR",
  },
});

export default instance;
