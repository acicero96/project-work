import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Aggiungi il token JWT a tutte le richieste protette
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers['Authorization'] = `${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default api;
