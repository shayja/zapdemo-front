import React, { useState } from 'react';
import ProductDataService from '../services/ProductService';

const AddProduct = () => {
  const initialProductState = {
    id: null,
    name: '',
    description: '',
    price: '',
  };
  const [product, setProduct] = useState(initialProductState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProduct({ ...product, [name]: value });
  };

  const saveProduct = () => {
    const data = {
      name: product.name,
      description: product.description,
      price: product.price,
    };

    ProductDataService.create(data)
      .then((response) => {
        setProduct({
          id: response.data.id,
          name: response.data.name,
          description: response.data.description,
          price: response.data.price,
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const newProduct = () => {
    setProduct(initialProductState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button type="button" className="btn btn-success" onClick={newProduct}>Add</button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="title">Product Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              required
              value={product.name}
              onChange={handleInputChange}
              name="name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              className="form-control"
              id="description"
              required
              value={product.description}
              onChange={handleInputChange}
              name="description"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Price</label>
            <input
              type="text"
              className="form-control"
              id="price"
              required
              value={product.price}
              onChange={handleInputChange}
              name="price"
            />
          </div>

          <button type="button" onClick={saveProduct} className="btn btn-success">Submit</button>
        </div>
      )}
    </div>
  );
};

export default AddProduct;
