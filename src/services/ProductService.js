import http from '../http-common';

const getAll = () => http.get('/product');

const get = (id) => http.get(`/product/${id}`);

const create = (data) => http.post('/product', data);

const update = (id, data) => http.put(`/product/${id}`, data);

const remove = (id) => http.delete(`/product/${id}`);

const removeAll = () => http.delete('/product');

const findByName = (name) => http.get(`/product/search/${name}`);

export default {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByName,
};
