import http from '../http-common';

const getAll = () => http.get('/products');

const get = (id) => http.get(`/products/${id}`);

const create = (data) => http.post('/products', data);

const update = (id, data) => http.put(`/products/${id}`, data);

const remove = (id) => http.delete(`/products/${id}`);

const removeAll = () => http.delete('/products');

const findByName = (name) => http.get(`/products/search/${name}`);

export default {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByName,
};
