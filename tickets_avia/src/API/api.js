import axios from "axios"

const SEARCH_URL = "search";
const TICKETS_URL = "/tickets?searchId=";

const instance  = axios.create({
  baseURL: "https://front-test.beta.aviasales.ru/",
  timeout: 1500,
})


export const getSearchID = () => {
  try {
    const response = instance.get(SEARCH_URL)
    return response
  } catch (error) {
    console.error(error);
  }
}

export const getTicketsPart = (searchId) => {
  try {
		const response = instance.get(`${TICKETS_URL}${searchId}`)
		return response
	} catch (error) {
		console.error(error)
	}
}