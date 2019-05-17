import axios from 'axios';

const api = axios.create({
   // baseURL: 'https://upload-arquivos-backend.herokuapp.com',
   // baseURL: 'upload-arquivos-backend.herokuapp.com',

    baseURL: 'http://localhost:3000',
});

export default api;
