import axios from 'axios';

export const HTTP = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
  headers: {
    Authorization: {
      username: process.env.VUE_APP_USERNAME,
      password: process.env.VUE_APP_PASSWORD
    }
  }
})
