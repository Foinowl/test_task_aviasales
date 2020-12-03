const axios = require('axios').default;

class Api {
	constructor() {
		this.baseURL = `https://front-test.beta.aviasales.ru`
	}

	getSearchId() {
		return axios.get(`${this.baseURL}/search`)
	}
	getChunkBySearchId(searchId) {
		return axios.get(`${this.baseURL}/tickets?searchId=${searchId}`)
	}
}

const api = new Api()

export default api
