import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import ProductForm from './components/products/ProductForm';
import ProductList from './components/products/ProductList';
import ClientList from './components/clients/ClientList';
import ClientForm from './components/clients/ClientForm';
import ProductUpdate from './components/products/ProductUpdate';
import ClientUpdate from './components/clients/ClientUpdate';
import ConfigurationForm from './components/configurations/ConfigurationForm';
import SalesList from './components/sales/SalesList';
import Sales from './components/sales/Sales';


const App = () => (

  <Router>
    <Fragment>
      <Navbar />
      <Route exact path='/' component={Landing} />
      <section class='container'>
        <Switch>
          
          <Route exact path='/configuracion' component={ConfigurationForm} />
          <Route exact path='/sales' component={Sales} />
          <Route
            exact
            path='/configuracion/form'
            component={ConfigurationForm}
          />
          <Route exact path='/productos/form' component={ProductForm} />
          <Route exact path='/ventas' component={SalesList} />

          <Route exact path='/productos' component={ProductList} />
          <Route exact path='/clientes/form' component={ClientForm} />
          <Route exact path='/clientes' component={ClientList} />
          <Route
            exact
            path='/productos/actualizar/:id'
            component={ProductUpdate}
          />
          <Route
            exact
            path='/clientes/actualizar/:id'
            component={ClientUpdate}
          />
        </Switch>
      </section>
    </Fragment>
  </Router>
);

export default App;
