import axios from 'axios';

const api = axios.create({
    baseURL: 'https://upload-arquivos-banckend.herokuapp.com',

    //baseURL: 'http://localhost:3333',
});

export default api;