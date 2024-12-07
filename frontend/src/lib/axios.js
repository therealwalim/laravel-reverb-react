import Axios from 'axios'

const axios = Axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_URL,
})

axios.interceptors.request.use(config => {
    axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default axios;