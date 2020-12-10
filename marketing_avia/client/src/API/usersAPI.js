import axios from "axios"


const instance = axios.create({ baseURL: "http://localhost:3333/api" })


export const getUserApi = (id) => {
  return instance.get(`/users/${id}`)
}

export const updateUserApi = (id, props) => {
  return instance.patch(`/users/${id}`, { props })
}

export const createUserApi = () => {
  return instance.post('/users');
}