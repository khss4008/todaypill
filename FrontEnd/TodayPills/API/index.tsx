import axios from "axios";

// localhost:3306
// mysql:3306

// let URL = "http://10.0.2.2:8080/api";
let URL = "https://k7a706.p.ssafy.io/api";
// if (window.location.hostname === "localhost") {
//   URL = `http://localhost:8080/api`;
// } else {
//   URL = `http://${window.location.hostname}/api`;
// }

export default function apiInstance() {
  const instance = axios.create({
    baseURL: URL,
    timeout: 30000,
    headers: {
      "Content-type": "application/json;charset=UTF-8",
    },
  });
  return instance;
}
