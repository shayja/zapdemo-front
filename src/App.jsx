import React from 'react';
import {
  BrowserRouter as Router, Switch, Route, Link,
} from 'react-router-dom';

import './App.css';

import AddProduct from './components/AddProduct';
import Product from './components/Product';
import ProductsList from './components/ProductsList';

function App() {
  return (
    <Router>
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <a href="/products" className="navbar-brand">
            Zap Demo
          </a>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to="/products" className="nav-link">
                Products
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/add" className="nav-link">
                Add
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={['/', '/products']} component={ProductsList} />
            <Route exact path="/add" component={AddProduct} />
            <Route path="/products/:id" component={Product} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
