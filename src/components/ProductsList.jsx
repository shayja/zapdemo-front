import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductDataService from '../services/ProductService';

const ProductsList = () => {
  const [products, setProducts] = useState([]);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchName, setSearchName] = useState('');

  const retrieveProducts = () => {
    ProductDataService.getAll()
      .then((response) => {
        setProducts(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    retrieveProducts();
  }, []);

  const onChangeSearchName = (e) => {
    const search = e.target.value;
    setSearchName(search);
  };

  const setActiveProduct = (product, index) => {
    setCurrentProduct(product);
    setCurrentIndex(index);
  };

  
  const refreshList = () => {
    retrieveProducts();
    setCurrentProduct(null);
    setCurrentIndex(-1);
  };

  const removeAllProducts = () => {
    ProductDataService.removeAll()
      .then(response => {
        console.log(response.data);
        refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  };
  
  const findByName = () => {
    ProductDataService.findByName(searchName)
      // eslint-disable-next-line arrow-parens
      .then(response => {
        setProducts(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div className="list row">
      <div className="col-md-8">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by product name"
            value={searchName}
            onChange={onChangeSearchName}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByName}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <h4>Products List</h4>

        <ul className="list-group">
          {products
            && products.map((product, index) => (
              <li
                className={
                  `list-group-item ${index === currentIndex ? 'active' : ''}`
                }
                onClick={() => setActiveProduct(product, index)}
                key={index}
              >
                {product.name}
              </li>
            ))}
        </ul>

       
        <button
          type="button"
          className="m-3 btn btn-sm btn-info"
          onClick={retrieveProducts}
        >
          Show All
        </button>

      </div>
      <div className="col-md-6">
        {currentProduct ? (
          <div>
            <h4>Selected Product</h4>
            <div>
              <label>
                <strong>Name:</strong>
              </label>
              {' '}
              {currentProduct.name}
            </div>
            <div>
              <label>
                <strong>Description:</strong>
              </label>
              {' '}
              {currentProduct.description}
            </div>
            <div>
              <label>
                <strong>Price:</strong>
              </label>
              {' '}
              {currentProduct.price}
            </div>

            <Link to={`/products/${currentProduct.id}`} className="btn btn-secondary">
              Edit
            </Link>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Product...</p>
          </div>
        )}

<button type="button"
          className="m-3 btn btn-sm btn-danger float-right"
          onClick={removeAllProducts}
        >
          Remove All
        </button>
      </div>

     



    </div>
  );
};

export default ProductsList;
