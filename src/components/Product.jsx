import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ProductDataService from '../services/ProductService';

const Product = (props) => {
  const initialProductState = {
    id: null,
    name: '',
    description: '',
    price: '',
  };
  const [currentProduct, setCurrentProduct] = useState(initialProductState);
  const [message, setMessage] = useState('');

  const getProduct = (id) => {
    ProductDataService.get(id)
      .then((response) => {
        setCurrentProduct(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getProduct(props.match.params.id);
  }, [props.match.params.id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCurrentProduct({ ...currentProduct, [name]: value });
  };

  const updateProduct = () => {
    ProductDataService.update(currentProduct.id, currentProduct)
      .then((response) => {
        console.log(response.data);
        setMessage('The product was updated successfully!');
        setTimeout(() => {
          props.history.push('/products');
        }, 3000);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const deleteProduct = () => {
    ProductDataService.remove(currentProduct.id)
      .then((response) => {
        console.log(response.data);
        setMessage('The product was deleted!');
        setTimeout(() => {
          props.history.push('/products');
        }, 3000);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentProduct ? (
        <div className="edit-form">
          <h4>Product</h4>
          <form>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={currentProduct.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                name="description"
                value={currentProduct.description}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="price">Price</label>
              <input
                type="text"
                className="form-control"
                id="price"
                name="price"
                value={currentProduct.price}
                onChange={handleInputChange}
              />
            </div>
          </form>

          <button type="button" className="badge badge-danger mr-2" onClick={deleteProduct}>
            Delete
          </button>

          <button
            type="submit"
            className="badge badge-success"
            onClick={updateProduct}
          >
            Update
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Product...</p>
        </div>
      )}
    </div>
  );
};

Product.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.node,
    }).isRequired,
  }).isRequired,
  history: PropTypes.func.isRequired,
};

export default Product;
