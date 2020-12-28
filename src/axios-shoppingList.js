import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-shopping-list-2a959.firebaseio.com/',
});

export default instance;
