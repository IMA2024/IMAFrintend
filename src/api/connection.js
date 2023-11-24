import axios from "axios";

export const Axios = axios.create({
    baseURL: 'https://imaa-2585bbde653a.herokuapp.com/',
    headers: {'Content-Type':"application/json"}
  });