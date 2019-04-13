import axios from 'axios';

const api = axios.create({
    baseURL: 'https://upload-banckend.herokuapp.com',
});

export default api;