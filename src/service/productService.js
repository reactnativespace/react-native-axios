import axios from 'axios';

const API_URL = "https://fakestoreapi.com"

const getProducts = async () => {
    return new Promise((resolve, reject) => {
        axios.get(API_URL + '/products?limit=10')
            .then((res) => {
                resolve(res.data)
            })
            .catch((err) => {
                reject(err)
            });
    });
};

const getProductById = async (id) => {
    return new Promise((resolve, reject) => {
        axios.get(API_URL + '/products/' + id)
            .then((res) => {
                resolve(res.data)
            })
            .catch((err) => {
                reject(err)
            });
    });
};

export { getProducts, getProductById }