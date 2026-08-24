import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://ebac-projeto-final-backend.onrender.com/api/'
})

