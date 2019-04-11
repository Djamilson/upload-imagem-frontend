import axios from 'axios';

const api = axios.create({
    baseURL: 'https://omnistack-banckend.herokuapp.com',
});

export default api;