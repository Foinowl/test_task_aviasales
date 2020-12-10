import axios from "axios"


const instance = axios.create({ baseURL: "http://localhost:3333/api" })


export const getUser = (id) => {
  return instance.get(`/users/${id}`)
}

export const updateUser = (id, props) => {
  return instance.patch(`/users/${id}`, { props })
}

export const createUser = () => {
  return instance.post('/users');
}