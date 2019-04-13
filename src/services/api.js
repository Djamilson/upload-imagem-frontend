import axios from 'axios';

const api = axios.create({
    baseURL: 'https://uploadms-frontend.herokuapp.com',
});

export default api;