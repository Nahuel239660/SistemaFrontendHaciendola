import axios from 'axios';
import authHeader from './authHeader';

const API_URL = 'http://localhost:3001/api/products';

export const getProducts = () => {
    return axios.get(API_URL, { headers: authHeader() });
};

export const createProduct = (productData) => {
    return axios.post(API_URL, productData, { headers: authHeader() });
};

export const deleteProduct = (productId) => {
    return axios.delete(`${API_URL}/${productId}`, { headers: authHeader() });
};
