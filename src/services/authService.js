import axios from 'axios';

const API_URL = 'http://localhost:3001/api';

export const login = async (username, password) => {
    const response = await axios.post(`${API_URL}/users/login`, { username, password });
    if (response.data.token) {
        localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
};

export const logout = () => {
    localStorage.removeItem('user');
};

export const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem('user'));
};
