import axios from 'axios';

const http = axios.create({
	baseURL: "http://localhost:5000/api",
	headers: {},
})

const getData = () => http.get(`/dashboard`)

export default getData