import axios from 'axios';
import authHeader from './auth-header';
const API_URL = 'http://localhost:9000/api/v1/';
const API_URL_Events = API_URL + 'events/';
class EventService {
	getAllEvents() {
		return axios.get(API_URL_Events, { headers: authHeader() });
	}
	deleteEvents(eventId: any) {
		return axios.delete(API_URL_Events + 'delete/' + eventId, { headers: authHeader() });
	}
	createEvent(event: any) {
		return axios.post(API_URL_Events, event, { headers: authHeader() });
	}
	editEvent(event: any, eventId: any) {
		return axios.patch(API_URL_Events + eventId, event, { headers: authHeader() });
	}
}
export default new EventService();
